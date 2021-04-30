import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Tabs from "./navigation/tabs";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import 'react-native-gesture-handler';
const Stack = createStackNavigator()

const App = () => {
    //<Tabs />
    return(
        <NavigationContainer  >
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name={"signup"} component={SignupScreen} />
                <Stack.Screen name={"signin"} component={SigninScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export  default  App;