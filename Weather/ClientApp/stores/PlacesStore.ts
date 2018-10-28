import { observable, action } from 'mobx';
import { Place } from "../services/weather-api";

export class PlacesStore {
    @observable places: Place[] = [];

    @action
    setPlaces(places: Place[]) {
        this.places = places;
    }

    @action
    addPlace(place: Place) {
        this.places.push(place);
    }
}

const placesStore = new PlacesStore();
export default placesStore;