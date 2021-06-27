import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button ,TextInput} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Favorite from "../components/Favorite";

const FavoriteScreen = (props) => {


    const [email,setEmail] = useState("loading")
    const Boiler = async ()=>{
        const token = await AsyncStorage.getItem("token")
        fetch('http://10.0.2.2:3000/',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{
                    console.log(data)
                    setEmail(data.email)
                }
            )
    }
    useEffect(()=>{
        Boiler()
    },[])


    const logout =(props)=>{
        AsyncStorage.removeItem("token").then(()=>{
            props.navigation.replace("login")
        })
    }

    /* POur se deconnecter
    *
    *  <View style={styles.container}>
            <Text> Favorite Screen</Text>
            <Button
                mode="contained"
                style={{marginLeft:18,marginRight:18,marginTop:18}}
                onPress={() => logout(props)}>
                logout
            </Button>
        </View>
    * */

    return (
            <Favorite />
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});