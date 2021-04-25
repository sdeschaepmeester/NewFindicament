import React from 'react'

import MainStackNavigator from './navigation/MainStackNavigator'

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 750);

export default function App() {
  return <MainStackNavigator />
}