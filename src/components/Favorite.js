import React, {Component} from "react";
import DetailsScreen from "../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {List} from './List'
import {Alert, ImageBackground, StyleSheet, Text, View} from "react-native";


class Favorite extends Component {



    state = {
        drugs: [
        ],
        page:1,
        previousDrugs:[

        ]
    };


    async getDrugs(){
        const drugsResponses = await  fetch('http://10.0.2.2:3000/getFavorite/'+this.state.page,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {
                if(responseJson.error){
                    console.log("response")
                    console.log(responseJson.error)
                    return []
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                return [];
            });

        const drugs = await drugsResponses
        this.setState({drugs:drugs})

    }

    async componentDidMount() {
        console.log("start")
        await  this.getDrugs()
        this.focusListener  = this.props.navigation.addListener("focus",async () => {
            console.log("start 2")
            await  this.getDrugs()

        });

    }

    componentWillUnmount() {
        // remove event listener
        console.log("exit")
        this.focusListener();
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    handleLoadMore = () =>{
        console.log("this.state.page")
        console.log(this.state.page)
        this.state.page += 8
        this.getDrugs()
    }


    deleteFavorite = async (cip) => {
        await fetch('http://10.0.2.2:3000/deleteFavorite', {
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

        await this.getDrugs()
    }

    alert = (s) => {
        Alert.alert(
            s,
            'Cette action est irréversible',
            [
                { text: 'Supprimer', onPress: () => deleteFavorite(), style: 'cancel' },
                { text: 'Annuler', onPress: () => console.log('Annulation') },
            ],
            { cancelable: false }
        )
    }



    render() {

        let drugs = this.state.drugs;
        const {navigation}= this.props;
        const image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

        if(this.state.drugs.length != 0){
            return(
                <List
                    navigation={navigation}
                    drugs={drugs}
                    page={"Favorite"}
                    onDelete={this.deleteFavorite}
                    handleLoadMore={this.handleLoadMore}
                />
            )
        }else{
            return(
                <Text>No Favorite data</Text>
            )
        }

    }
}

export {Favorite as FavoriteClass}

export default class FavoriteStack extends Component {

    render() {

        const Stack = createStackNavigator();

        return (
            <Stack.Navigator >
                <Stack.Screen name="Favorite" component={Favorite} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({

})