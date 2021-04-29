import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PlanningController from "../components/PlanningController";

const PlanningScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <PlanningController/>
    </View>
  );
};

export default PlanningScreen;   


