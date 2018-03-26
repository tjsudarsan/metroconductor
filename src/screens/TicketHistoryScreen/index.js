import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import {connect} from 'react-redux';

class TicketHistoryScreen extends React.Component {
    render(){
        return (
            <Fragment>
                <View style={styles.headerContainer}>
                    <Text style={styles.titleText}>Ticket History</Text>
                </View>
                <View style={{flex:1,backgroundColor:"white"}}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.info}>View all your ticket histories here!</Text>
                        {this.props.userDetails.travelHistory.reverse().map((ticket,key)=>{
                            var dateAndTime = new Date(ticket.timeStamp).toString().split(' ')
                            return (
                                <View key={key} style={styles.ticketContainer}>
                                    <View style={styles.ticketDetails}>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>Ticket Number:</Text> {ticket.ticketNo}</Text>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>From:</Text> {ticket.fromLocation}</Text>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>To:</Text> {ticket.toLocation}</Text>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>No of Tickets:</Text> {ticket.noOfTickets}</Text>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>Fare:</Text> {`₹ ${ticket.fare}/-`}</Text>
                                    </View>
                                    <View style={styles.ticketTime}>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>Date:</Text> {`${dateAndTime[1]} ${dateAndTime[2]} ${dateAndTime[3]}`}</Text>
                                        <Text style={styles.ticketText}><Text style={styles.ticketLabel}>Time:</Text> {dateAndTime[4]}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: 'white'
    },
    info :{
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        color: 'black'
    },
    ticketContainer:{
        flexDirection: 'row',
        margin: 10
    },
    ticketDetails: {
        flex: 2,
        borderWidth: 2,
        borderColor: '#b90000',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderStyle: 'dashed'
    },
    ticketTime:{
        flex: 1,
        borderWidth: 2,
        borderColor: '#b90000',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderStyle: 'dashed'
    },
    ticketText: {
        color: 'black'
    },
    ticketLabel:{
        fontWeight: 'bold',
        color: '#b90000'
    },
    headerContainer: {
        height: '11%',
        elevation: 10,
        backgroundColor: '#b90000',
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    userDetails: state.userReducer
})

export default connect(mapStateToProps)(TicketHistoryScreen);