import React, { Component } from "react";
import DetailsScreen from "../../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {List} from '../List'
import {Text} from "react-native";



class HomeController extends Component {



    state = {
        drugs: [


        ],
        page:1,
        previousDrugs:[

        ]
    };


    async getDrugs() {
        const drugsResponses = await fetch('http://10.0.2.2:3000/getDrugs/'+this.state.page, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {
                console.log("respon,se are "+responseJson)
                return responseJson;
            })
            .catch((error) => {
                console.log("response are "+error)
                console.error(error);
                return [];
            });
        let drugs =  drugsResponses

        if(this.state.drugs.length > 0){
            this.setState({ previousDrugs: this.state.drugs })
            drugs = this.state.previousDrugs.concat(drugs)
        }
        this.setState({ drugs: drugs })
    }

    async componentDidMount() {
        console.log("start")
        await this.getDrugs()
    }

    handleLoadMore = () =>{
        this.state.page += 8
        this.getDrugs()
    }


    render() {

        let drugs = this.state.drugs;
        const { navigation } = this.props;
        console.log("the list of drugs :")
        if(drugs.length != 0){
            return(

                <List
                    navigation={navigation}
                    drugs={drugs}
                    page={"Home"}
                    handleLoadMore={this.handleLoadMore}
                />
            )
        }
        else{
            return (
                <Text>Aucun médicamnet</Text>
            )
        }


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

