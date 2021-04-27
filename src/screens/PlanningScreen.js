import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlanningScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Planning Screen</Text>

        </View>
    );
};

export default PlanningScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});