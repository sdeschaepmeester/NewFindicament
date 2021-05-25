import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Controller/HomeController';
import  DetailsScreen  from '../screens/DetailsScreen';


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
  }
}