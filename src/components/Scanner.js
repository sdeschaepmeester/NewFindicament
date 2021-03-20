import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Constants } from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {MainStackNavigator} from '../navigation/MainStackNavigator'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
export default class App extends Component{
    state = {
      CameraPermissionGranted: null,  
    }
    async componentDidMount() {
      // Ask for camera permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ CameraPermissionGranted: status === "granted" ? true : false });
    }
  
  
    barCodeScanned = ({ data }) => {
      //Access the Data
          alert(data);
    }
  
    render(){
      const { CameraPermissionGranted } = this.state;
      if(CameraPermissionGranted === null){
        // Request Permission
        return(
          <View style={styles.container}>
              <Text>Please grant Camera permission</Text>
          </View> 
        );
      }
      if(CameraPermissionGranted === false){
          // Permission denied
        return ( 
          <View style={styles.container}>
           <Text>Camera Permission Denied.</Text>
          </View> 
        );
      }
      if(CameraPermissionGranted === true){
        // Got the permission, time to scan
        return (
          <View style = {{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
          }}>
       <BarCodeScanner
          onBarCodeScanned = {this.barCodeScanned }
          style={[StyleSheet.absoluteFill, styles.container]}>
          <Text style={styles.description}>Scanner votre code</Text>
          <Image
            style={styles.qr}
            source={require('../assets/qr_render.png')}
          />
        {           
          <Text
            onPress={() => this.props.navigation.pop()}
            style={styles.cancel}>
            X
          </Text> 
        }

        </BarCodeScanner>
          </View>
        );
        
      }
    }
  }

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.07,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});


