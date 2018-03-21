import React, { Component } from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {NativeRouter, Route, Link, Switch} from 'react-router-native'
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import IssueTicketScreen from '../screens/IssueTicketScreen'
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen'
import PinVerificationScreen from '../screens/PinVerificationScreen'
import FingerprintRecognitionScreen from '../screens/FingerprintRecognitionScreen';

const Routes = (props) => {
    return (
        <NativeRouter>
            <Switch>
                <Route exact path='/' component={HomeScreen} />
                <Route path='/dashboard' component={DashboardScreen} />
                <Route path="/issueticket" component={IssueTicketScreen} />
                <Route path="/fingerprint" component={FingerprintRecognitionScreen} />
                <Route path="/scanqr" component={ScanQRCodeScreen} />
                <Route path='/pin' component={PinVerificationScreen} />
            </Switch>
        </NativeRouter>
    )
}

const mapStateToProps = (state) => ({
    busDetails: state.busReducer
})

export default connect(mapStateToProps)(Routes);