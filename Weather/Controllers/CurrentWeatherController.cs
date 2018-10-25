using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Weather.Clients;

namespace Weather.Controllers
{
    [Produces("application/json")]
    [Route("api/currentweather")]
    public class CurrentWeatherController : Controller
    {
        private OpenWeatherMapClient _client;
        
        public CurrentWeatherController(OpenWeatherMapClient client)
        {
            _client = client;
        }

        [HttpGet]
        public async Task<CurrentWeather[]> Get()
        {
            var places = new List<string> { "London,uk", "Dundee,uk", "Brisbane" };
            return await Task.WhenAll(places.Select(p => _client.GetCurrentWeather(p)));
        }

        [HttpGet("{lat}/{lng}")]
        public async Task<CurrentWeather> Get(double lat, double lng)
        {
            return await _client.GetCurrentWeather(lat, lng);
        }
    }
}
