export class WeatherApi {
    public async GetWeather(): Promise<Place[]> {
        try {
            const response = await fetch(`http://localhost:58278/api/CurrentWeather`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return await response.json() as Place[];
        } catch (error) {
            throw Error(error);
        }
    }

    public async GetWeatherByCoords(lat: number, lng: number): Promise<Place> {
        try {
            const response = await fetch(`http://localhost:58278/api/CurrentWeather/${lat}/${lng}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return await response.json() as Place;
        } catch (error) {
            throw Error(error);
        }
    }
}

export interface Place {
    name: string;
    tagName: string;
    main: Main;
    weather: Weather[];
    wind: Wind;
}
export interface Main {
    humidity: number;
    pressure: number;
    temp: number;
}
export interface Weather {
    main: string;
    description: string;
}
export interface Wind {
    deg: number;
    speed: number;
}