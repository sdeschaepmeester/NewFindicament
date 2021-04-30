import React,{useEffect} from 'react';
import { Button,TextInput} from 'react-native-paper';
import {
    ActivityIndicator, StyleSheet
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoadingScreen = () =>{

    const detectLogin= async ()=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            props.navigation.replace("drugs")
        }else{
            props.navigation.replace("sigin")
        }
    }
    useEffect(()=>{
        detectLogin()
    },[])


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