import React, { Fragment } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

class IssueTicketScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isFareLoading: false,
            fare: null
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
                        <View style={styles.fromAndTo}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(e) => this.setState({ busNo: e.toUpperCase() })}
                                placeholderTextColor="#b90000"
                                underlineColorAndroid="#b90000"
                                placeholder='From Location'
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(e) => this.setState({ busNo: e.toUpperCase() })}
                                placeholderTextColor="#b90000"
                                underlineColorAndroid="#b90000"
                                placeholder='To Location'
                            />
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
                            <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
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
    }
}

export default IssueTicketScreen;