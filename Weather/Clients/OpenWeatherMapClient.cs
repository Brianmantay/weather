using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace Weather.Clients
{
    public class OpenWeatherMapClient
    {
        private static HttpClient client = new HttpClient();

        public async Task<CurrentWeather> GetCurrentWeather(string place)
        {
            var result = await client.GetAsync($"https://api.openweathermap.org/data/2.5/weather?q={place}&appid=8ce494869bc11d24f35abe5383dd6119");
            result.EnsureSuccessStatusCode();
            var data = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<CurrentWeather>(data);
        }

        public async Task<CurrentWeather> GetCurrentWeather(double lat, double lng)
        {
            var result = await client.GetAsync($"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid=8ce494869bc11d24f35abe5383dd6119");
            result.EnsureSuccessStatusCode();
            var data = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<CurrentWeather>(data);
        }
    }

    public class CurrentWeather
    {
        public string Name { get; set; }
        public Main Main { get; set; }
        public Weather[] Weather { get; set; }
        public Wind Wind { get; set; }
    }

    public class Wind
    {
        public double Deg { get; set; }
        public double Speed { get; set; }
    }

    public class Main
    {
        public double Humidity { get; set; }
        public double Pressure { get; set; }
        public double Temp { get; set; }
    }

    public class Weather
    {
        public string Main { get; set; }
        public string Description { get; set; }
    }
}
