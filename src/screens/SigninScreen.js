import React,{useState} from 'react';
import {View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SigninScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    const sendCred = async (props) => {
        console.log('test0')

        fetch("http://10.0.2.2:3000/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log('test1')
                console.log('test2'+data.token)
                console.log('test2')

                //console.log('test2'+data.token)

                try {
                    await AsyncStorage.setItem('token', data.token)
                    console.log('test')
                    props.navigation.replace("tab")
                } catch (e) {
                    console.log("error hai", e)
                }
            })
    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
            <Text style={{fontSize:35,marginLeft:15}} >Se Connecter</Text>
            <View>
                <TextInput
                    label="Email"
                    value={email}
                    style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    mode={"outlined"}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    mode={"outlined"}
                    onChangeText={(text)=>{setPassword(text)}}
                />
                <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    onPress={() => sendCred(props)}>
                    Connexion
                </Button>
            </View>
                <TouchableOpacity>
                    <Text onPress={()=>props.navigation.navigate("signup")}>Tu n'as pas de compte ?</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>

        </View>
    );
};

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});