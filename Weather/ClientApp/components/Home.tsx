import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WeatherList } from "./WeatherList";


export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <WeatherList />
    }
}
