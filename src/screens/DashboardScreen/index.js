import React, { Component,Fragment } from 'react';
import { View, Text, BackHandler, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import logoutIcon from '../../assests/logouticon.png'
import { initializeBus } from '../../services';
import { initializeBusAction } from '../../redux/actions/busActions'
import database from '../../services/firebase';

class DashboardScreen extends Component {
    state = {
        isLoading: false
    }

    locationId = null;

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { 
            if(this.props.history.location.pathname ==='/dashboard' && this.props.history.location.pathname === '/'){
                return true
            }else{
                this.props.history.goBack();
                return true;
            }
        })

        console.log(this.props.history)

        this.locationId = navigator.geolocation.watchPosition(({coords})=>{
            database.ref(`buses/${this.props.busDetails.busNo}`).set({
                latitude: coords.latitude,
                longitude: coords.longitude
            })
        },err=>console.log(err), {enableHighAccuracy: true, distanceFilter: 10, timeout: 5000, maximumAge: 0})
    }

    handleLogout() {
        this.setState({isLoading: true})
        initializeBus(this.props.busDetails.busNo, false).then(res => {
            if (res.status === true) {
                navigator.geolocation.clearWatch(this.locationId);
                database.ref(`buses/${this.props.busDetails.busNo}`).set({
                    latitude: 0,
                    longitude: 0
                })
                this.props.dispatch(initializeBusAction({ busNo: null, onDuty: false }));
                this.props.history.replace('/');
            }
        })
    }
    render() {
        return (
            <View style={[styles.container, { justifyContent: `${this.state.isLoading ? 'center' : 'flex-start'}` }]}>
                {this.state.isLoading ? <ActivityIndicator size={75} color="#b90000" /> :
                    <Fragment>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Dashboard</Text>
                            <TouchableOpacity style={{ position: 'absolute', right: 15 }} onPress={() => this.handleLogout()}>
                                <Image source={logoutIcon} style={styles.logout} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.busDetailsContainer}>
                            <View style={styles.busDetails}>
                                <Text style={styles.busDetailText}>Bus Number: </Text>
                                <Text style={[styles.busDetailText,{color: '#b90000'}]}>{this.props.busDetails.busNo || 'NaN'}</Text>
                            </View>
                            <View style={styles.busDetails}>
                                <Text style={styles.busDetailText}>On Duty: </Text>
                                <Text style={[styles.busDetailText,{color: '#b90000'}]}>{this.props.busDetails.onDuty ? 'Started' : 'Ended'}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=>this.props.history.push('/issueticket')}>
                                <Text style={styles.btnTxt}>Issue Ticket</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=>this.props.history.push('/scanqr/checkticket')}>
                                <Text style={styles.btnTxt}>Check Ticket</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        height: 60,
        backgroundColor: '#b90000',
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 18
    },
    logout: {
        height: 35,
        width: 35,
    },
    busDetailsContainer:{
        marginTop: 25
    },
    busDetailText:{
        fontSize: 25,
        padding: 1,
        color: 'black'
    },
    busDetails:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    btn:{
        marginTop: 45,
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#b90000'
    },
    btnTxt:{
        fontSize: 20,
        color: 'white'
    }
}

const mapStateToProps = (state) => ({
    busDetails: state.busReducer
})

export default connect(mapStateToProps)(DashboardScreen);