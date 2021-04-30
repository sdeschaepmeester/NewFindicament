import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button title="click here"
            onPress={() => alert('yas')} />
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});