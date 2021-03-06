import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet,Text,View,Image,TouchableOpacity} from  'react-native'
import React from 'react';

import PlanningScreen from "../screens/PlanningScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SignupScreen from "../screens/SignupScreen"
import SigninScreen from "../screens/SigninScreen"
import LoadingScreen from "../screens/LoadingScreen";
import Scanner from "../components/Scanner";
import Profile from "../components/Profile";
import HomeStack from  "../components/Controller/HomeController"
import History from "../components/History";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children,onPress})=>(
    <TouchableOpacity
        style={{
            left:-30,
            top: -60,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
    onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#61D2E4'
        }}>
            {children}
        </View>
    </TouchableOpacity>

);

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 80,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Drugs" component={HomeStack}
            options={{
                tabBarIcon: ({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top: 10,left:15}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                             resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#61D2E4' : '#748c94'
                            }}   />
                        <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                            ACCUEIL
                        </Text>
                    </View>
                )
            }}
            />
            <Tab.Screen name="Favorite" component={FavoriteScreen}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10,left:25}}>
                                    <Image
                                        source={require('../assets/icons/star.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        FAVORIS
                                    </Text>
                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Profile" component={Profile}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 18,left:37,width:80}}>
                                    <Image
                                        source={require('../assets/icons/user.png')}
                                        resizeMode='contain'
                                        style={{

                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        PROFILE
                                    </Text>
                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Scanner" component={Scanner}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <Image
                                    source={require('../assets/icons/qr-code.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: '#fff' 
                                    }}   />
                            ),
                            tabBarButton: (props) => (
                                <CustomTabBarButton {...props} />


                            )
                        }}
            />
            <Tab.Screen name="History" component={History}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10,right:25,width:80}}>
                                    <Image
                                        source={require('../assets/icons/history.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        HISTORIQUE
                                    </Text>
                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Planning" component={PlanningScreen}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10,right:15}}>
                                    <Image
                                        source={require('../assets/icons/planning.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        PLANNING
                                    </Text>
                                </View>
                            )
                        }}
            />

        </Tab.Navigator>
    )


}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs