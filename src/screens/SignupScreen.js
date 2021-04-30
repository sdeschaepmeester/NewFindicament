import React,{useState} from 'react';
import {View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Button,TextInput } from 'react-native-paper';

const SignupScreen = (props) => {

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    let sendCred = () =>{
        fetch("")
        console.log(email,password)
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
            <Text style={{fontSize:35,marginLeft:0}} >Create account</Text>
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
                    onChangeText={(text)=>setPassword(text)}
                />
                <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    onPress={() =>sendCred()}>
                    Sign up
                </Button>
            </View>
                <TouchableOpacity>
                    <Text onPress={()=>props.navigation.navigate("signin")}>Already have an account ?</Text>

                </TouchableOpacity>
        </KeyboardAvoidingView>

        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});