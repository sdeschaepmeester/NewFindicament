import React, { Component } from 'react';
import { Image, StyleSheet, Button, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { moreDetails } from './GoToDetails';

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
    user :[

    ]
  }
  async componentDidMount() {
    // Ask for camera permission
    await this.getProfileInfo()
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ CameraPermissionGranted: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ data }) => {
    const { navigation } = this.props;
    new ResultScan().getResult({ navigation }, data);
  };

  async getProfileInfo(){
    const ProfileResponses = await  fetch('http://192.168.1.83:3000/getDataProfile',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
        .then(res => res.json())
        .then((responseJson) => {

          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });

    let profile =  ProfileResponses

    this.setState({ user: profile })
    console.log("this.state.profile")
    console.log(this.state.profile)
  }

  render() {
    const { CameraPermissionGranted } = this.state;
    const { navigation } = this.props;
    if(this.state.user.length ==0){
      return (
          <View style={styles.container}>
            <Text>
                Impossible de se connecter à Findicament
            </Text>
          </View>
      )
    }else{
      if (CameraPermissionGranted === null) {
        return (
            <View style={styles.container}>
              <Text>Veuillez autoriser l'accès à la caméra.</Text>
            </View>
        );
      }
      if (CameraPermissionGranted === false) {
        // Permission denied
        return (
            <View style={styles.container}>
              <Text>Accès à la caméra refusé.</Text>
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
                  onBarCodeScanned={this.handleBarCodeScanned}
                  style={[StyleSheet.absoluteFill, styles.container]}>
                <Text style={styles.description}>Scannez votre code</Text>
                <Image
                    style={styles.qr}
                    source={require('../assets/qr_render.png')}
                />
              </BarCodeScanner>
            </View>
        );
      }
    }

  }
}

class ResultScan extends Component {
  state = { count: 0 }
  getResult = ({ navigation }, Value) => {
    let string = JSON.stringify(Value)
    let firstNumbers = string.substring(3)

    let codeCIP = "";
    if (this.state.count < 1) {
      if (firstNumbers.includes("34009")) {
        //Get the 13 characters starting at the position where 3 starts
        codeCIP = Value.substring(Value.indexOf("34009"), 17)
        codeCIP = codeCIP.substring(0, 5) + (" ") + codeCIP.substring(5, 8) + (" ") + codeCIP.substring(8, 11) + " " + codeCIP.substring(11, 12) + " " + codeCIP.substring(12, 14)
        moreDetails({ navigation }, codeCIP, "Medoc")

      }
      else {
        if (firstNumbers.startsWith("009")) {
          //Add 34 at the beginning and delete the last character (")
          codeCIP = "34" + firstNumbers.slice(0, -1)
          codeCIP = codeCIP.substring(0, 5) + (" ") + codeCIP.substring(5, 8) + (" ") + codeCIP.substring(8, 11) + " " + codeCIP.substring(11, 12) + " " + codeCIP.substring(12, 14)
          moreDetails({ navigation }, codeCIP, "Medoc")
        }
        else {
          alert(Value)
          // Product scanned is not a medicament
          alert("Le produit scanné n'est pas un médicament ou ne fait pas parti de notre base de données.")
        }
      }
      this.state.count = 2;
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


