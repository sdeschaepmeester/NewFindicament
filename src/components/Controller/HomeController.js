import React, { Component } from "react";
import DetailsScreen from "../../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {List} from '../List'
import {Text} from "react-native";



class HomeController extends Component {



    state = {
        drugs: [


        ]
    };


    async getDrugs() {
        const drugsResponses = await fetch('http://192.168.1.91:3000/getDrugs', {
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

