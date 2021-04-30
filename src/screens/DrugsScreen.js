import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import { ActivityIndicator,View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DrugsScreen = (props) => {



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