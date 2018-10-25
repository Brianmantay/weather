import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { WeatherListItem } from "./WeatherListItem";
import { WeatherApi, Place } from "../services/weather-api";
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { LocalStorageApi } from "../services/local-storage-api";

interface WeatherListState {
    places: Place[]
}

export class WeatherList extends React.Component<{}, WeatherListState> {

    private readonly api: WeatherApi = new WeatherApi();
    private readonly storage: LocalStorageApi = new LocalStorageApi();

    constructor() {
        super();
        this.state = { places: [] };
    }

    async componentDidMount() {
        let places = this.storage.get<Place[]>('places');
        if (!places) {
            // get some 'saved' places from a db that doesn't exist yet'
            places = await this.api.GetWeather();
            this.storage.set('places', places);
        }
        this.setState({ places });
    }
    
    render() {
        return <div>
            {
                this.state.places.map(p => {
                    return <WeatherListItem place={p} key={p.name} />
                })
            }
            <Link to="/add">
                <div className="add-weather-list-item">
                    <FontAwesomeIcon icon="plus" className="fas fa-3x plus"/>
                </div>
            </Link>
        </div>
    }
}



