import React, { Component } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, TouchableHighlight } from "react-native";
import { Avatar, List } from "react-native-paper";
import DetailsScreen from "../../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import List from '../List'
import { moreDetails } from '../GoToDetails';
import { Card, ListItem } from 'react-native-elements'



class HomeController extends Component {



    state = {
        drugs: [
            {
                code_cip: 1,
                id: 'Medoc1',
            },
            {
                codeCIP: 2,
                id: 'Medoc2',
            },
            {
                codeCIP: 3,
                id: 'Medoc3',
            },
        ]
    };


    async getDrugs() {
        const drugsResponses = await fetch('http://10.0.2.2:3000/getDrugs', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        const drugs = drugsResponses
        this.setState({ drugs: drugs })

    }

    async componentDidMount() {
        console.log("start")
        await this.getDrugs()
        //this.findHistory()
        //this.changeView(this.state.description)
    }



    render() {

        let drugs = this.state.drugs;
        const { navigation } = this.props;
        console.log("the list of drugs :")

        return(

            <List
                navigation={navigation}
                drugs={drugs}
                page={"Home"}
            />
        )

    }




}

export default class HomeStack extends Component {



    render() {

        const Stack = createStackNavigator();

        return (
            <Stack.Navigator >
                <Stack.Screen name="Home" component={HomeController} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        );
    }
}

