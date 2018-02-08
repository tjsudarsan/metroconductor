import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {parseString} from 'xml2js';

export default class ScanQRCodeScreen extends Component<{}> {
  constructor(){
    super();
    this.state={
      data : '555'
    }
  }
  onSuccess(e){
    parseString(e.data,{trim: true},(err,result)=>{
      this.setState({
        data: result.PrintLetterBarcodeData.$.uid
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner 
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={{textAlign:'center'}}>Scan QR Code</Text>
          }
          bottomContent={<Text style={{textAlign:'center'}}>Aadhaar No : {this.state.data}</Text>}
          reactivate={true}
          showMarker={true}
          reactivateTimeout={2000}
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
  }
});
