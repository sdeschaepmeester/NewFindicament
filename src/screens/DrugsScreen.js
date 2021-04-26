import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DrugsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Drugs Screen</Text>
        </View>
    );
};

export default DrugsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});