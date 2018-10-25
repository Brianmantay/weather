import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'

export const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB7eS_CuDEeDOax4SnFB7c9sbgrbDG3zqU'
export interface PlaceMapProps {
    handleSelection(lat: number, lng: number): void
}
export const PlaceMap: React.SFC<PlaceMapProps> = (props) => {
    const MyGoogleMap = withScriptjs(withGoogleMap(() =>
        <GoogleMap
            defaultCenter={{ lat: -27.3818631, lng: 152.7130055 }}
            defaultZoom={8}
            onClick={(e) => {
                props.handleSelection(e.latLng.lat(), e.latLng.lng());
                console.log({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            }}
            options={{ disableDefaultUI: true }}>
        </GoogleMap>))
    const loadingElement = <div />
    const containerElement = <div style={{ height: '100vh' }} />
    const mapElement = <div style={{ height: '100vh' }} />
    return <MyGoogleMap loadingElement={loadingElement}
        containerElement={containerElement}
        googleMapURL={googleMapURL}
        mapElement={mapElement} />
}