import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet,Text,View,Image,TouchableOpacity} from  'react-native'
import React from 'react';

import DetailsScreen from "../screens/DetailsScreen";
import DrugsScreen from "../screens/DrugsScreen";
import PlanningScreen from "../screens/PlanningScreen";
import HistoryScreen from "../screens/HistoryScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import Scanner from "../components/Scanner";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children,onPress})=>(
    <TouchableOpacity
        style={{
            top: -30,
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
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Drugs" component={DrugsScreen}
            options={{
                tabBarIcon: ({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top: 10}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                             resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#61D2E4' : '#748c94'
                            }}   />
                        <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                            HOME
                        </Text>
                    </View>
                )
            }}
            />
            <Tab.Screen name="Favorite" component={FavoriteScreen}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10}}>
                                    <Image
                                        source={require('../assets/icons/star.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        FAVORITE
                                    </Text>
                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Detail" component={Scanner}
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
            <Tab.Screen name="History" component={HistoryScreen}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10}}>
                                    <Image
                                        source={require('../assets/icons/history.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#61D2E4' : '#748c94'
                                        }}   />
                                    <Text style={{color: focused ? '#61D2E4': '#748c94', fontSize: 12}} >
                                        HISTORIC
                                    </Text>
                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Planning" component={PlanningScreen}
                        options={{
                            tabBarIcon: ({focused})=>(
                                <View style={{alignItems:'center',justifyContent:'center',top: 10}}>
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