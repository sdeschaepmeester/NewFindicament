import * as React from 'react';
import { View } from 'react-native';
import History from "../components/History";

const HistoryScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <History />

    </View>
  );
};

export default HistoryScreen;