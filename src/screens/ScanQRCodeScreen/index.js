import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {parseString} from 'xml2js';
import {checkWallet} from '../../services'
import {connect} from 'react-redux';
import {saveUid} from '../../redux/actions/userActions'

class ScanQRCodeScreen extends Component {
  
  componentDidMount(){
    // this.scanner.reactivate();
  }
  onSuccess(e){
    this.setState({isLoading: true})
    parseString(e.data,{trim: true},(err,result)=>{
      if(result.PrintLetterBarcodeData.$.uid.toString().length === 12){
        checkWallet(result.PrintLetterBarcodeData.$.uid,this.props.fare).then((res)=>{
          if(res.status === true){
            this.props.dispatch(saveUid(result.PrintLetterBarcodeData.$.uid));
            this.props.history.replace('/pin');
          }else {
            this.scanner.reactivate();
            Alert.alert(
              'Attention!',
              res.error,
              [{text: 'OK'}],
              {cancelable: false}
            )
          }
        })
        // this.setState({
        //   data: result.PrintLetterBarcodeData.$.uid
        // })
      }else { 
        this.scanner.reactivate();
        Alert.alert(
          'Error',
          'Invalid QR Code',
          [{text: 'OK'}],
          {cancelable: false}
        )
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner 
          ref={e=> this.scanner = e}
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.text}>Scan Aadhaar QR Code</Text>
          }
          bottomContent={
            <Text style={styles.text}>Please show the QR code inside the green marker</Text>
          }
          reactivate={true}
          showMarker={true}
          reactivateTimeout={1000}
          style={{flex:1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#b90000',
    padding: 10
  }
});

const mapStateToProps = (state) => ({
  fare: state.userReducer.fare
})

export default connect(mapStateToProps)(ScanQRCodeScreen);
