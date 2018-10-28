import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { WeatherListItem } from "./WeatherListItem";
import { WeatherApi, Place } from "../services/weather-api";
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { LocalStorageApi } from "../services/local-storage-api";
import { PlacesStore } from "../stores/PlacesStore";
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react';

interface WeatherListProps {
    placesStore?: PlacesStore
}

@inject('placesStore')
@observer
export class WeatherList extends React.Component<{}, {}> {
    store?: PlacesStore;

    private readonly api: WeatherApi = new WeatherApi();
    private readonly storage: LocalStorageApi = new LocalStorageApi();

    constructor(props: WeatherListProps) {
        super(props);
        this.store = props.placesStore;
    }

    async componentDidMount() {
        if (!this.store!.places.length) {
            // get some 'saved' places from a db that doesn't exist yet'
            const places = await this.api.GetWeather();
            this.store!.setPlaces(places);
        }  
    }
    
    render() {
        return <div>
            {
                this.store!.places.map(p => {
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



