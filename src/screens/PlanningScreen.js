import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PlanningController from "../components/Controller/PlanningController";

const PlanningScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <PlanningController/>
    </View>
  );
};

export default PlanningScreen;   


