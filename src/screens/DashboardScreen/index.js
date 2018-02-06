import React, { Component } from 'react';
import {View, Text, BackHandler} from 'react-native'

class DashboardScreen extends Component {
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',()=>{return true})
    }
    render() {
        return (
            <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                <Text>Dashboard</Text>
            </View>
        );
    }
}

export default DashboardScreen;