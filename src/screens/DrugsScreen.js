import * as React from 'react';
import { List } from 'react-native-paper';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import DrugsController from '../components/FiltersController'


const DrugsScreen = ({ navigation }) => {

  return (
    <View>
      <DrugsController/>
    </View>
  );
};

export default DrugsScreen;