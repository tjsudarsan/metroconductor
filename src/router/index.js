import React, { Component } from 'react';
import {View} from 'react-native';
import {NativeRouter, Route, Link, Switch} from 'react-router-native'
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Routes = () => (
    <NativeRouter>
        <Switch>
            <Route exact path='/' component={HomeScreen}/>
            <Route path='/dashboard' component={DashboardScreen}/>
        </Switch>
    </NativeRouter>
)

export default Routes;