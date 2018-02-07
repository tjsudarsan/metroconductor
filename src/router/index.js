import React, { Component } from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {NativeRouter, Route, Link, Switch} from 'react-router-native'
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import IssueTicketScreen from '../screens/IssueTicketScreen'

const Routes = (props) => {
    return (
        <NativeRouter>
            <Switch>
                {/* <Route exact path='/' component={HomeScreen} />
                <Route path='/dashboard' component={DashboardScreen} /> */}
                <Route path="/" component={IssueTicketScreen} />
            </Switch>
        </NativeRouter>
    )
}

const mapStateToProps = (state) => ({
    busDetails: state.busReducer
})

export default connect(mapStateToProps)(Routes);