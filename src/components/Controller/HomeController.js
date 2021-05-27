import React, { Component } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, TouchableHighlight } from "react-native";
import { Avatar, List } from "react-native-paper";
import DetailsScreen from "../../screens/DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
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
        //console.log(drugs[0].code_cip)

        const Item = ({ title }) => (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>


                <TouchableOpacity
                    onPress={() => moreDetails({ navigation }, title, "Medoc")}
                    style={styles.item}>
                    <Text >Title </Text>
                    <Text >{title}</Text>
                </TouchableOpacity>
            </View>
        );

        const renderItem = ({ item }) => (
            <Item title={item.code_cip} />
        );


        return (
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#dff2ff" }}>

                <SafeAreaView >
                <Text style={{ fontSize: 30, textAlign: "center" }}>Liste de médicaments</Text>
                </SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        data={drugs}
                        renderItem={renderItem}

                        keyExtractor={item => item.id}
                    />
                </ScrollView>

            </View>
        );

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

const styles = StyleSheet.create({
    item: {
        height: 75,
        backgroundColor: "white",
        width: "90%",
        padding: 20,
        fontSize: 24,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: 5
    },
    image: {
        height: 30,
        position: "relative"
    },
});