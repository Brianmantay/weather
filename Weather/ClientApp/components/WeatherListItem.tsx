import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { Place } from "../services/weather-api";

interface WeatherListItemProps {
    place: Place,
}
export const WeatherListItem: React.SFC<WeatherListItemProps> = (props) => {
    const { place } = props;
    const style = {
        backgroundImage: 'url(' + require('../css/images/'+ place.weather[0].main.toLowerCase() +'.jpg') + ')'
    };

    const kelvinToCelsius = (temp: number) => {
        return (temp - 273.15).toFixed(1);
    } 

    return (
        <Panel className="weather-list-item" style={style}>
            <h1>{place.name}</h1> {place.tagName && <h4>- {place.tagName}</h4>}
            <h2>{kelvinToCelsius(place.main.temp)} &deg;C</h2>
            <h4>{place.weather[0].description}</h4>
        </Panel>
    )
};




