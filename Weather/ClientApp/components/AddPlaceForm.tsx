import * as React from 'react';
import { FormGroup, FormControl, ControlLabel, Modal, Button } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router';
import { PlaceMap } from './Map'
import { WeatherApi, Place } from '../services/weather-api'
import { LocalStorageApi } from '../services/local-storage-api'
import { WeatherListItem } from './WeatherListItem'

interface AddPlaceFormState {
    showModal: boolean,
    place?: Place,
    tagName: string
}

export class AddPlaceForm extends React.Component<RouteComponentProps<{}>, AddPlaceFormState> {

    private readonly api: WeatherApi = new WeatherApi();
    private readonly storage: LocalStorageApi = new LocalStorageApi();

    constructor() {
        super();

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            showModal: false,
			tagName: ''
        };
    }

	render() {
        return <div>
            <PlaceMap handleSelection={this.onHandleMapSelection} />

            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <form onSubmit={this.handleSave}>
					<Modal.Header closeButton>
						<Modal.Title>Save this Place</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{ this.state.place && <WeatherListItem place={this.state.place} /> }
						<FormGroup>
							<ControlLabel>Tag this place</ControlLabel>
							<FormControl
								type="text"
                                value={this.state.tagName}
                                placeholder="e.g. My place"
                                onChange={this.handleChange}
							/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<input type="submit" value="Save" color="primary" className="btn btn-primary" />
						<Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
					</form>
				</Modal>
			</div>
    }

    handleClose = () => {
        this.setState({ showModal: false, place: undefined });
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.state.place) return;

		// Meh... Just using local storage instead of a db for now
        let places = this.storage.get<Place[]>('places') || [];
        places.push({
            ...this.state.place,
			tagName: this.state.tagName
        });
        this.storage.set('places', places);

        this.setState({ showModal: false });
        this.props.history.push("/");
    }

	// fml
    handleChange = (e: any) => {
        const value = e.currentTarget.value;
        this.setState({ tagName: value });
    }

    onHandleMapSelection = async (lat: number, lng: number) => {
        let place = await this.api.GetWeatherByCoords(lat, lng);
        this.setState({ place });
        this.handleShow();
    }
}