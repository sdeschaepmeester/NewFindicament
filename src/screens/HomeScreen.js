import * as React from 'react';
import { View } from 'react-native';
import HomeStack from  "../components/Controller/HomeController"

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <HomeStack />
        </View>
    );
};

export default HomeScreen;