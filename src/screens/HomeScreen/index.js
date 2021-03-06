import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Switch, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-native';
import bgImage from '../../assests/welcomescreenbg.jpg'
import {initializeBus} from '../../services';

class HomeScreen extends Component {
    state = {
        busNo: '',
        onDuty: false,
        isInitialized: false,
        isLoading: false
    }
    handleInitialize() {
        this.setState({isLoading: true})
        initializeBus(this.state.busNo,this.state.onDuty).then(res=>{
            res.status ?  this.setState({isInitialized: true}) : 
                Alert.alert(
                    'Error',
                    res.error,
                    [{text: 'OK'}],
                    {cancelable: false}
                )
                this.setState({isLoading:false})
        })
    }
    render() {
        return (
            <ImageBackground source={bgImage} style={{ flex: 1 }}>
                {this.state.isInitialized ? <Redirect to='/dashboard' /> : null}
                <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={[styles.container,{justifyContent:`${this.state.isLoading?'center':'flex-start'}`}]}>
                {this.state.isLoading ? 
                    <ActivityIndicator size={75} color="white"/>
                    :
                    <View>
                        <View style={styles.logo}>
                        <Text style={styles.metro}>Metro</Text>
                        <Text style={styles.caption}>Bus Conductor</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.textInput} onChangeText={(e)=>this.setState({busNo: e.toUpperCase()})} placeholderTextColor="white" underlineColorAndroid="white" placeholder="Enter Bus Number"/>
                        <Text style={styles.onDutyText}>On Duty: </Text>
                        <Switch 
                            style={styles.switch}
                            disabled={this.state.busNo !== '' ? false : true}
                            tintColor="white"
                            onTintColor="#b90000"
                            thumbTintColor="white"
                            value={this.state.onDuty}
                            onValueChange={()=>this.setState({onDuty: !this.state.onDuty})}
                        />
                    </View>
                    {this.state.onDuty ? <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.handleInitialize()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.btntext}>Initialize Bus</Text>
                    </TouchableOpacity> : null}
                    </View>    
                }    
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    logo: {
        marginTop: 100,
        marginBottom: 15
    },
    metro: {
        fontSize: 45,
        textDecorationLine: 'underline',
        textAlign: 'center',
        color: 'white'
    },
    caption: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    btn: {
        borderWidth: 1,
        borderColor: '#b90000',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 3,
        backgroundColor: '#b90000',
    },
    btntext: {
        color: 'white',
        fontSize: 18
    },
    textInput: {
        marginTop: 5,
        marginBottom: 5,
        width: 175,
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    onDutyText:{
        color: 'white',
        fontSize: 18,
        marginTop:10,
        marginBottom: 10,
    },
    switch: {
        position: 'absolute',
        top: 70,
        right: 10,
    }
}

export default HomeScreen;