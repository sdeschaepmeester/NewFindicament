import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ( {navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Text style={styles.textStyle}>
                Vous voici sur la page description de médicament
            </Text>
          
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
});