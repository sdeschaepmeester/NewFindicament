import React from 'react';
import {AppRegistry} from "react-native-web";
import {NavigationContainer} from '@react-navigation/native';
import Tabs from "./navigation/tabs";
import app from './ServerExample';
import {name as appName} from './app.json'


/*const App = () => {
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}*/

AppRegistry.registerComponent(appName, ()=> app)

//export  default  App;