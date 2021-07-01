import React,{useEffect,useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Tabs from "./navigation/tabs";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./screens/LoadingScreen";
import DrugsScreen from "./screens/DrugsScreen";
import OffLine from "./screens/OffLine";

const Stack = createStackNavigator()

const App = ({navigation}) => {
    //<Tabs />
    const [isloggedin,setLogged] = useState(null)
    const [drugs,setDrugs] = useState([])


    const checkIfConnected = async ()=>{
        const drugsResponses = await fetch('http://10.0.2.2:3000/getDrugs', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {
                if(responseJson.error){
                    console.log("response")
                    console.log(responseJson.error)
                    return []
                }
                console.log("respon,se are "+responseJson)
                return responseJson;
            })
            .catch((error) => {
                console.log("response are "+error)
                console.error(error);
                return [];
            });

        const drug = drugsResponses
        setDrugs(drug)
        console.log("connect ?")
        console.log(drug)
    }

    const detectLogin= async ()=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            setLogged(true)
        }else{
            setLogged(false)
        }
    }
    useEffect(()=>{
        detectLogin()
        checkIfConnected()
    },[])

   /* <Stack.Screen name="login" component={SigninScreen} />
    <Stack.Screen name="signup" component={SignupScreen} />
    <Stack.Screen name="loading" component={LoadingScreen} />*/



    if(drugs.length !== 0){
        return(
            <NavigationContainer  >
                <Stack.Navigator headerMode={"none"}>
                    <Stack.Screen name="login" component={SigninScreen} />
                    <Stack.Screen name="signup" component={SignupScreen} />
                    <Stack.Screen name="loading" component={LoadingScreen} />
                    <Stack.Screen name={"tab"} children={()=> <Tabs/>}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }else{
        return(
            <OffLine />
        )
    }

}

export  default  App;