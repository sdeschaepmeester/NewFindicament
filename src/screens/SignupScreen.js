import React,{useState} from 'react';
import {View, Text, StyleSheet,  KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePasswordValidation } from "../hooks/usePasswordValidation";


const SignupScreen = (props) => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
    });
    //const [password,setPassword]=useState('')
    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
    ] = usePasswordValidation({
        firstPassword: password.firstPassword,
        secondPassword: password.secondPassword,
    });

    const sendCred= async (props)=>{

        if(validLength&&hasNumber&&upperCase&&lowerCase&&match&&specialChar){
            console.log("bonne longueur")

            fetch("http://192.168.1.83:3000/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password.firstPassword
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
        }else{
            console.log("mauvaise longeur")
        }
    }
    const setFirst = (value) => {
        setPassword({ ...password, firstPassword: value });
    };
    const setSecond = (value) => {
        setPassword({ ...password, secondPassword: value });
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
            <Text style={{fontSize:30,marginLeft:-15}} >Création du compte</Text>
            <View>
                <TextInput
                    label="Email"
                    value={email}

                    style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    mode={"outlined"}
                    onChangeText={(text)=>setEmail(text)}
                />
                <View>
                    <View>
                        <Text>Mot de passe</Text>
                        <TextInput
                            label="Password"
                            style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                            mode={"outlined"}
                            value={password.firstPassword}
                            onChangeText={text => setFirst(text)} type='text' />
                    </View>
                    <View>
                        <Text>Vérification mot de passe</Text>
                        <TextInput
                            label="SecondPassword"
                            style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                            mode={"outlined"}
                            value={password.secondPassword}

                            onChangeText={text => setSecond(text)} type='text' />
                    </View>
                    <View>
                             {validLength ? null : <Text>Il faut qu'il y ait au moins 8 charactères</Text>}
                             {hasNumber ? null : <Text>Il faut au moins un chiffre</Text>}
                             {upperCase ? null : <Text>Il faut au moins une majuscule</Text>}
                            {lowerCase ? null: <Text>Il faut au moins une minuscule</Text>}
                            {match ? null : <Text>Les deux mots de passe ne correspondent pas</Text>}
                            {specialChar ? null : <Text>Il faut au moins un charactère spécial</Text>}
                    </View>
                </View>

                <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                    onPress={() =>sendCred()}>
                    Créer
                </Button>
            </View>
                <TouchableOpacity>
                    <Text onPress={()=>props.navigation.navigate("login")}>Tu as déjà un compte ?</Text>

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