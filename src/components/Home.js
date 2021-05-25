import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import Home from './Controller/HomeController';
import Details from '../screens/DetailsScreen';

const DrawerNavigator = createDrawerNavigator({
  Home: {screen: Home},
  Details: {screen: Details}
},{initialRouteName: 'Home'});

const Stack = createAppContainer(DrawerNavigator);

export default class App extends Component {
  render() {

    return <Stack />;
  }
}