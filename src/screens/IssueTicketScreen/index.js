import React, { Fragment } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Picker, Alert } from 'react-native';
import {connect} from 'react-redux';
import {initializeBus} from '../../services'
import {saveFromAndTo} from '../../redux/actions/userActions'

class IssueTicketScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isFareLoading: false,
            fare: null,
            fromLocation: null,
            toLocation: null,
            busDetails: {}
        }
    }

    handleFromSelect(from){
        this.setState({fromLocation: from});
        if(this.state.toLocation !== from && this.state.toLocation !== null && from !== 0){
            var fare = this.props.busDetails.stageWiseFare[Math.abs(this.props.busDetails.stageNames.indexOf(from) - this.props.busDetails.stageNames.indexOf(this.state.toLocation))-1]
            this.setState({fare,isFareLoading:false});
        }else if(this.state.toLocation === from){
            Alert.alert(
                'Attention!',
                'From and To cannot be same',
                [{text: 'Ok'}],
                {cancelable: false}
            )
            this.setState({fromLocation: null,toLocation:null})
        }else {
            this.setState({fare: null})
        }
    }

    handleToSelect(to){
        this.setState({toLocation: to});
        if(this.state.fromLocation !== to && this.state.fromLocation !== null && to !== 0){
            var fare = this.props.busDetails.stageWiseFare[Math.abs(this.props.busDetails.stageNames.indexOf(this.state.fromLocation) - this.props.busDetails.stageNames.indexOf(to))-1]
            this.setState({fare,isFareLoading: false});
        }else if(this.state.fromLocation === to){
            Alert.alert(
                'Attention!',
                'From and To cannot be same',
                [{text: 'Ok'}],
                {cancelable: false}
            )
            this.setState({fromLocation: null,toLocation:null})
        }else {
            this.setState({fare: null})
        }
    }

    handleScanQRCode(){
        if(this.state.toLocation !== null, this.state.fromLocation !== null){
            this.props.dispatch(saveFromAndTo(this.state.fromLocation,this.state.toLocation));
            this.props.history.push('/scanqr');
        }else{
            Alert.alert(
                'Attention!',
                'Select both from and to',
                [{text: 'OK'}],
                {cancelable: false}
            )
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, { justifyContent: `${this.state.isLoading ? 'center' : 'flex-start'}` }]} keyboardShouldPersistTaps={"always"}>
                {this.state.isLoading ? <ActivityIndicator size={75} color="#b90000" />
                    :
                    <Fragment>
                        <View style={styles.header}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Issue Ticket</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems:'center',marginBottom: 5}}>
                            <Text style={styles.label}>From: </Text>
                            <View style={styles.stageDropdowns}>
                                <Picker
                                    style={{width: 200,color: '#b90000'}}
                                    mode="dialog"
                                    selectedValue={this.state.fromLocation}
                                    onValueChange={(itemValue)=>this.handleFromSelect(itemValue)}
                                    prompt="Select location"
                                >
                                    <Picker.Item label={'Select From'} value={0} />
                                    {this.props.busDetails.stageNames !== undefined ? this.props.busDetails.stageNames.map((stage,key)=>{
                                        return (
                                            <Picker.Item key={key} label={stage} value={stage} />
                                        )
                                    }) :null }
                                </Picker>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Text style={styles.label}>To:      </Text>
                            <View style={styles.stageDropdowns}>
                                <Picker
                                    style={{width: 200,color: '#b90000'}}
                                    mode="dialog"
                                    selectedValue={this.state.toLocation}
                                    onValueChange={(itemValue)=>this.handleToSelect(itemValue)}
                                    prompt="Select location"
                                >
                                    <Picker.Item label={'Select To'} value={0} />
                                    {this.props.busDetails.stageNames!== undefined ? this.props.busDetails.stageNames.map((stage,key)=>{
                                        return (
                                            <Picker.Item key={key} label={stage} value={stage} />
                                        )
                                    }) :null }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.fareDisplay}>
                            {
                                this.state.isFareLoading ? <ActivityIndicator size={75} color="#b90000" />
                                :
                                <Fragment>
                                    {   this.state.fare ? <Text style={styles.fare}>{`₹ ${this.state.fare} /-`}</Text>
                                        :
                                        <Text style={styles.enterFromAndTo}>Select "From" and "To"</Text>
                                    }
                                </Fragment>
                            }
                        </View>
                        <View style={{ marginTop: 75 }}>
                            <TouchableOpacity onPress={()=>this.handleScanQRCode()} activeOpacity={0.5} style={styles.btn}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Scan QR Code</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                }
            </ScrollView>
        )
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
        backgroundColor: '#b90000',
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    textInput: {
        width: 300,
        textAlign: 'center',
        color: '#b90000',
        fontSize: 18
    },
    fareDisplay: {
        marginTop: 75,
    },
    fare: {
        fontSize: 50,
        color: '#b90000',
        borderWidth: 1.5,
        borderColor: '#b90000',
        borderRadius: 3,
        padding: 25
    },
    btn: {
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#b90000'
    },
    enterFromAndTo:{
        color: 'black',
        fontSize: 18
    },
    label:{
        fontSize: 18,
        color: 'black',
        paddingRight: 10
    },
    stageDropdowns:{
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 3,
        width: 200,
        padding: 0
    }
}

const mapStateToProps = (state) => ({
    busDetails: state.busReducer
})

export default connect(mapStateToProps)(IssueTicketScreen);