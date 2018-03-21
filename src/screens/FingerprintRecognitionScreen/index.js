import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import fingerprintIcon from '../../assests/fingerprint.png'

class FingerprintRecognitionScreen extends React.Component {
    state = {
        fingerprintStatus : true,
        display: false
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({display: true})
        },3000)
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Fingerprint Verification</Text>
                </View>
                <View style={styles.fingerprinticon}>
                    <Text style={styles.fingerprintText}>Please place fingerprint to verify and pay!</Text>
                    <Image source={fingerprintIcon} style={styles.fingerprintimage} />
                    {this.state.display ?
                        <Fragment>
                            <Text style={styles.fingerprintstatus}>{this.state.fingerprintStatus ? 'Verified' : 'Not Authorised'}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.history.push('/pin')} style={styles.btn}>
                                <Text style={styles.btntext}>PIN Verify</Text>
                            </TouchableOpacity>
                        </Fragment>
                        :
                        null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#b90000',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    headerText: {
        color: 'white',
        fontSize: 20
    },
    fingerprinticon: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fingerprintText: {
        fontSize: 20,
        textAlign: 'center',
    },
    fingerprintimage:{
        width: 100,
        height: 100,
        marginTop: 50
    },
    fingerprintstatus:{
        marginTop: 30,
        fontSize: 25
    },
    btn:{
        marginTop: 25,
        width: 300,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#b90000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 5
    },
    btntext:{
        color: 'white',
        fontSize: 20
    }
})

export default FingerprintRecognitionScreen;