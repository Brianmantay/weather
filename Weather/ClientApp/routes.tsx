import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AddPlaceForm } from './components/AddPlaceForm'

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/add' component={AddPlaceForm} />
</Layout>;
