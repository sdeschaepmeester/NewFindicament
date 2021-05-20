import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import { ActivityIndicator,View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListController from "../components/Controller/ListController";


const DrugsScreen = (props) => {

    return (
        <View style={styles.container}>
            <ListController/>
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