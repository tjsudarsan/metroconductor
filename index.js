import React from 'react'
import { AppRegistry } from 'react-native';
import ReduxStore from './src/redux/store/ReduxStore';
import {Provider} from 'react-redux';
import Routes from './src/router';

const App = ()=>{
    return (
        <Provider store={ReduxStore()}>
            <Routes />
        </Provider>
    )
}

AppRegistry.registerComponent('metroconductor', () => App);
