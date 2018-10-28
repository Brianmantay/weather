import * as React from 'react';
import { FormGroup, FormControl, ControlLabel, Modal, Button } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router';
import { PlaceMap } from './Map'
import { WeatherApi, Place } from '../services/weather-api'
import { LocalStorageApi } from '../services/local-storage-api'
import { WeatherListItem } from './WeatherListItem'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react';
import { PlacesStore } from "../stores/PlacesStore";

type Props = AddPlaceFormProps & RouteComponentProps<{}>;

interface AddPlaceFormProps {
    placesStore?: PlacesStore
}

@inject('placesStore')
@observer
export class AddPlaceForm extends React.Component<RouteComponentProps<{}>, {}> {
    store?: PlacesStore;

    private readonly api: WeatherApi = new WeatherApi();
    private readonly storage: LocalStorageApi = new LocalStorageApi();

    @observable showModal: boolean = false;
    @observable place?: Place;
    @observable tagName: string = '';

    constructor(props: Props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.store = props.placesStore;
    }

	render() {
        return <div>
            <PlaceMap handleSelection={this.onHandleMapSelection} />

            <Modal show={this.showModal} onHide={this.handleClose}>
                <form onSubmit={this.handleSave}>
					<Modal.Header closeButton>
						<Modal.Title>Save this Place</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{ this.place && <WeatherListItem place={this.place} /> }
						<FormGroup>
							<ControlLabel>Tag this place</ControlLabel>
							<FormControl
								type="text"
                                value={this.tagName}
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
        this.place = undefined;
        this.showModal = false;
    }

    handleShow = () => {
        this.showModal = true;
    }

    handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.place) return;

        this.place.tagName = this.tagName;
        this.store!.addPlace(this.place);

        this.handleClose();
        this.props.history.push("/");
    }

	// fml
    handleChange = (e: any) => {
        this.tagName = e.currentTarget.value;
    }

    onHandleMapSelection = async (lat: number, lng: number) => {
        this.place = await this.api.GetWeatherByCoords(lat, lng);
        this.place.tagName = this.tagName;
        this.handleShow();
    }
}