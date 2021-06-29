import React, { Component } from 'react';
import { Image, StyleSheet, Button, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { moreDetails } from './GoToDetails';
import { createStackNavigator } from '@react-navigation/stack';

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

  // Called when barcode is scanned
  barCodeScanned = ({ data }) => {
    alert(data);
  }
  handleBarCodeScanned = ({ data }) => {
    new ResultScan().getResult(data);
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

class ResultScan extends Component {
  getResult = Value => {
    let string = JSON.stringify(Value)
    let firstNumbers = string.substring(3)
    alert(firstNumbers)
    // le but : recupérer seulement le cip 
    // If includes 034 => il y a un cip donc on continue sinon on renvoie texte "Medicament non trouvé"
    //il faut tester le string pour savoir ou commence les 034... et couper ce qu'il y a avant
    //A partir de cela, il faut que la chaine ne fasse que 13 caracteres de long
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


