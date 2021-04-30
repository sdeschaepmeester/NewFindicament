import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Tabs from "./navigation/tabs";
import SignupScreen from "./screens/SignupScreen";


const App = () => {
    return(
        <NavigationContainer>
            <SignupScreen />
            <Tabs />
        </NavigationContainer>
    );
}

export  default  App;