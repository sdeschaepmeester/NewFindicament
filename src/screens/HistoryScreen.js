import { ListItem } from 'react-native-vector-icons';
import * as React from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import HistoryController from "../components/Controller/HistoryController";
import History from "../components/History";

const HistoryScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <History />

    </View>
  );
};

export default HistoryScreen;