import React from 'react';
import { Button,TextInput} from 'react-native-paper';
import {
    ActivityIndicator, StyleSheet
} from "react-native";

const LoadingScreen = () =>{
    return(

        <ActivityIndicator  style={styles.container} size={"large"} color={"blue"} />
    );
};

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});