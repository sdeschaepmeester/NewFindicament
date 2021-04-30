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
const Stack = createStackNavigator()

const App = () => {
    //<Tabs />
    const [isLoggedIn,setLogged] = useState(null)

    useEffect(async () =>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            setLogged(true)
            console.log("est log " +isLoggedIn);
        }else{
            console.log("est logf " +isLoggedIn);
            setLogged(false)
        }
    },[])
    return(
        <NavigationContainer  >
            <Stack.Navigator headerMode={"none"}>
                {
                    isLoggedIn == null ?
                        ( <Stack.Screen name={"drugs"} component={DrugsScreen} />)
                    : isLoggedIn == true ?
                        (<Tabs/>) :
                    (<>
                        <Stack.Screen name={"signup"} component={SignupScreen} />
                        <Stack.Screen name={"signin"} component={SigninScreen} />
                    </>)
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export  default  App;