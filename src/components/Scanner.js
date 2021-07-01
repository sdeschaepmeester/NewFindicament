import React, { Component } from 'react';
import { Image, StyleSheet, Button, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigator } from '../navigation/MainStackNavigator';
import { moreDetails } from './GoToDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
//ATTENTION
const onClose = () => {
  window.opener = null;
  window.open("", "_self");
  window.close();
};

export default class App extends Component {
  state = {
    CameraPermissionGranted: null,
  }
  async componentDidMount() {
    // Ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ CameraPermissionGranted: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ data }) => {
    const { navigation } = this.props;
    new ResultScan().getResult({navigation},data);
  };
  testhandleBarCodeScanned = ({ data }) => {
    data = "34009 363 672 1 0"
    console.log(data);
  };

  render() {
    const { CameraPermissionGranted } = this.state;
    const { navigation } = this.props;
    if (CameraPermissionGranted === null) {
      return (
        <View style={styles.container}>
          <Text>Please grant Camera permission</Text>
        </View>
      );
    }
    if (CameraPermissionGranted === false) {
      // Permission denied
      return (
        <View style={styles.container}>
          <Text>Camera Permission Denied.</Text>
        </View>
      );
    }
    if (CameraPermissionGranted === true) {
      // Permission granted
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <BarCodeScanner
            //onBarCodeScanned = {this.barCodeScanned }
            onBarCodeScanned={this.handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}>
            <Text style={styles.description}>Scanner votre code</Text>
            <Image
              style={styles.qr}
              source={require('../assets/qr_render.png')}
            />
          </BarCodeScanner>
          <Button
            style={{ fontSize: 20, color: 'green' }}
            styleDisabled={{ color: 'red' }}
            onPress={() => moreDetails({ navigation }, "34009 363 672 1 0", "Medoc")}
            title="Test scanner"
          >
            Test scanner
          </Button>
        </View>
      );
    }
  }
}

const goToDetails = () => {
  const { navigation } = this.props;
  moreDetails({ navigation }, "34009 363 672 1 0", "Medoc")
}

class ResultScan extends Component {

  getResult = ({navigation},Value) => {
    let string = JSON.stringify(Value)
    let firstNumbers = string.substring(3)

    let codeCIP = "";
    if(firstNumbers.includes("34009")){
      //Get the 13 characters starting at the position where 3 starts
      codeCIP = Value.substring(Value.indexOf("34009"),17)
      //alert(codeCIP)
      //moreDetails({ navigation },codeCIP,"")
    }
    else{
      if(firstNumbers.startsWith("009")){
        //Add 34 at the beginning and delete the last character (")
        codeCIP = "34"+firstNumbers.slice(0, -1)
        //alert(codeCIP)
        moreDetails({ navigation }, "34009 369 184 9 8", "Medoc")
      }
      else{
        alert(Value)
        // Product scanned is not a medicament
        alert("Le produit scanné n'est pas un médicament ou ne fait pas parti de notre base de données.")
      }
    }
  };
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


