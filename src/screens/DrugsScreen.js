import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListController from "../components/List";


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