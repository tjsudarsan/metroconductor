import React, { Component, Fragment } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { payTicket } from '../../services'

class PinVerificationScreen extends Component {
    state = {
        pinNumber: null,
        isLoading: false
    }
    handlePay() {
        if (this.state.pinNumber.toString().length === 4) {
            this.setState({ isLoading: true })
            var details = this.props.userDetails;
            payTicket(details.uid, details.fare, details.from, details.to, details.noOfTickets)
                .then(res => {
                    if (res.status === true) {
                        this.setState({ isLoading: false })
                        Alert.alert(
                            'Success!',
                            'Ticket generated.',
                            [{ text: 'OK', onPress: () => this.props.history.replace('/issueticket') }],
                            { cancelable: false }
                        )
                    } else {
                        this.setState({ isLoading: false })
                        Alert.alert(
                            'Attention!',
                            'Something went wrong try again later.'
                            [{ text: 'OK', onPress: () => this.props.history.replace('/issueticket') }],
                            { cancelable: false }
                        )
                    }
                })
        } else {
            Alert.alert(
                'Attention!',
                'Enter 4-digit PIN Number'
                [{ text: 'OK'}],
                { cancelable: false }
            )
        }
    }
    render() {
        return (
            <View style={[styles.container, { justifyContent: `${this.state.isLoading ? 'center' : 'flex-start'}` }]}>
                {this.state.isLoading ? <ActivityIndicator size={75} color="#b90000" />
                    :
                    <Fragment>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>PIN Verification</Text>
                        </View>
                        <View style={styles.instructions}>
                            <Text style={styles.instructionsText}>Please Enter PIN for Verification</Text>
                        </View>
                        <View style={styles.pin}>
                            <TextInput
                                placeholder="Enter PIN"
                                underlineColorAndroid="transparent"
                                onChangeText={e => this.setState({ pinNumber: e })}
                                style={styles.pinNumberEntry}
                                secureTextEntry
                                placeholderTextColor="grey"
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.7} style={styles.confirmPay} onPress={() => this.handlePay()}>
                            <Text style={styles.confirm}>Confirm</Text>
                        </TouchableOpacity>
                    </Fragment>
                }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    header: {
        height: 60,
        backgroundColor: '#b90000',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    headerText: {
        fontSize: 20,
        color: 'white'
    },
    instructions: {
        marginTop: 50,
        margin: 10
    },
    instructionsText: {
        fontSize: 18
    },
    pin: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinNumberEntry: {
        width: 300,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderColor: '#b90000',
        borderRadius: 2
    },
    confirmPay: {
        marginTop: 50,
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 3,
        backgroundColor: '#b90000',
        height: 45,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirm: {
        fontSize: 20,
        color: 'white'
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.userReducer
})

export default connect(mapStateToProps)(PinVerificationScreen);