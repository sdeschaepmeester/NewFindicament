import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, ListItem, Icon } from 'react-native-elements'

const SignupScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const sendCred = async (props) => {
        fetch("http://10.0.2.2:3000/signup", {
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
                try {
                    await AsyncStorage.setItem('token', data.token)
                    props.navigation.replace("home")
                } catch (e) {
                    console.log("error hai", e)
                }
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"height"}>
                <Text style={{ textAlign: 'center', fontSize: 30}} >Création du compte</Text>
                <View>
                    <Card>
                        <TextInput
                            label="Email"
                            value={email}

                            style={{ marginLeft: 18, marginRight: 18, marginTop: 20, marginBottom: 20, width: 200 }}
                            mode={"outlined"}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            secureTextEntry={true}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 20, marginBottom: 20, width: 200 }}
                            mode={"outlined"}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Button mode="contained" style={{ backgroundColor: "#0099ff", marginLeft: 18, marginRight: 18, marginTop: 20, marginBottom: 20, width: 200 }}
                            onPress={() => sendCred()}>
                            Creation
                </Button>
                    </Card>
                </View>
                <TouchableOpacity>
                    <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => props.navigation.navigate("login")}>Vous posséder déjà un compte ?</Text>
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
        justifyContent: 'center',
        backgroundColor: '#def3ff'
    },
});