import React, {Component} from "react";
import DetailsScreen from "../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import List from './List'
import {Alert, ImageBackground, StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";


class History extends Component {



    state = {
        drugs: [
            {
                code_cip: 1,
                id: 'Medoc1',
            }
        ]
    };


    async getDrugs(){
        const drugsResponses = await  fetch('http://10.0.2.2:3000/getHistory',{
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
        this.setState({drugs:drugs})

    }

    async componentDidMount() {
        console.log("start")
        await  this.getDrugs()
        this.focusListener  = this.props.navigation.addListener("focus",async () => {
            console.log("start 2")
            await  this.getDrugs()

        });

        //this.findHistory()
        //this.changeView(this.state.description)
    }

    componentWillUnmount() {
        // remove event listener
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }


      deleteHistoryById = async (cip) => {
        console.log("delete")
         fetch('http://10.0.2.2:3000/deleteHistory', {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 cip: cip
             }),
         });
         await  this.getDrugs()
    }

    alert = (s) => {
        Alert.alert(
            s,
            'Cette action est irréversible',
            [
                { text: 'Supprimer', onPress: () => deleteHistory(), style: 'cancel' },
                { text: 'Annuler', onPress: () => console.log('Annulation') },
            ],
            { cancelable: false }
        )
    }



    render() {

        let drugs = this.state.drugs;
        const {navigation}= this.props;
        //console.log("the list of drugs :")
        const image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

        return(
                <List
                    navigation={navigation}
                    drugs={drugs}
                    page={"History"}
                    onDelete={this.deleteHistoryById}
                />

        )

    }




}

export default class HistoryStack extends Component {



    render() {

        const Stack = createStackNavigator();

        return (
            <Stack.Navigator >
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({


})