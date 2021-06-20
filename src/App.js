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
import CheckPassword from "./components/CheckPassword";

const Stack = createStackNavigator()

const App = ({navigation}) => {
    //<Tabs />
    const [isloggedin,setLogged] = useState(null)

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
    },[])

   /* <Stack.Screen name="login" component={SigninScreen} />
    <Stack.Screen name="signup" component={SignupScreen} />
    <Stack.Screen name="loading" component={LoadingScreen} />*/


    return(
        <NavigationContainer  >
            <Stack.Navigator headerMode={"none"}>
               <Stack.Screen name={"check"} children={()=> <CheckPassword/>}/>
               <Stack.Screen name={"tab"} children={()=> <Tabs/>}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export  default  App;