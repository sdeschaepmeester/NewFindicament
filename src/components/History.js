import React, {Component} from "react";
import DetailsScreen from "../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {List} from './List'
import {Alert, ImageBackground, StyleSheet, Text, View} from "react-native";


class History extends Component {



    state = {
        drugs: [
        ],
        page:1,
        previousDrugs:[

        ],
        isReloading: false
    };


    async getDrugs(){
        const drugsResponses = await  fetch('http://10.0.2.2:3000/getHistory/'+this.state.page,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {
                console.log("ok il passe pas")

                if(responseJson.error){
                    console.log("response")
                    console.log(responseJson.error)
                    return []
                }
                console.log("ok il passe")
                return responseJson;
            })
            .catch((error) => {
                 console.log("errro")

                console.error(error);
                return [];
            });
        let drugs =  drugsResponses
        console.log("drugs")
        console.log(drugs)
        if(this.state.isReloading){
            console.log("reloading")
            this.setState({ previousDrugs: this.state.drugs })
            drugs = this.state.previousDrugs.concat(drugs)
            this.state.isReloading = false

        }

        this.setState({ drugs: drugs })

    }

    async componentDidMount() {
        console.log("start")
        await  this.getDrugs()
        this.focusListener  = this.props.navigation.addListener("focus",async () => {
            console.log("start 2")
            this.state.page = 1
            await  this.getDrugs()

        });

    }

    componentWillUnmount() {
        // remove event listener
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }


    handleLoadMore = () =>{
        console.log("this.state.page")
        this.state.isReloading = true
        this.state.page += 8
        this.getDrugs()
    }


      deleteHistory = async (cip) => {
        await fetch('http://10.0.2.2:3000/deleteHistory', {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 cip: cip
             }),
         });
        console.log("delete")
        this.state.page = 1
         await this.getDrugs()
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
        const image = { uri: "https://zupimages.net/up/21/17/y60l.png" };
        console.log("lenght"+ drugs.length)
        if(drugs.length != 0){
            return(
                <List
                    navigation={navigation}
                    drugs={drugs}
                    page={"History"}
                    onDelete={this.deleteHistory}
                    handleLoadMore={this.handleLoadMore}
                />
            )
        }else{
            return(
                <Text>L'historique est vide</Text>
            )
        }

    }
}

export {History as HistoryClass}

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