import React from 'react';
import {View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Button,TextInput } from 'react-native-paper';

const SignupScreen = (props) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
            <Text style={{fontSize:35,marginLeft:0}} >Create account</Text>
            <View>
                <TextInput
                    label="Email"
                    style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    mode={"outlined"}
                />
                <TextInput
                    label="Password"
                    style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    mode={"outlined"}
                />
                <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    onPress={() => console.log('Pressed')}>
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