import React, {Component} from "react";
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Button,TouchableHighlight} from "react-native";
import {Avatar, List} from "react-native-paper";
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


    async getDrugs(){
        const drugsResponses = await  fetch('http://10.0.2.2:3000/getDrugs',{
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
        this.findHistory()
        //this.changeView(this.state.description)
    }

    findHistory(drugs) {


        return (
            <View>
                {drugs.map(drug => (
                    <List.Item
                        key={drug.code_cip}
                        title={drug.id}
                        left={props =>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>Hello</Text>
                            </View>
                        }
                    />
                ))}




            </View>
        )
    }



    GoToButton() {
        const navigation = useNavigation();
        const screenName = "ok"
        return (
            <Button
                title={`Go to ${screenName}`}
                onPress={() => navigation.navigate(screenName)}
            />
        );
    }


    render() {

        let drugs = this.state.drugs;
        const {navigation}= this.props;
        console.log("the list of drugs :")
        //console.log(drugs[0].code_cip)

        const Item = ({ title }) => (

            <TouchableOpacity

                onPress={()=>this.props.navigation.navigate('Details', {
                 codeCIP: title,})}
                style={styles.item}>
                <Text >Title </Text>
                <Text >{title}</Text>
            </TouchableOpacity>

        );

        const renderItem = ({ item }) => (
            <Item  title={item.code_cip} />
        );


        return (
            <View style={{ flex: 1, paddingTop: 30 }}>

                <SafeAreaView style={styles.container}>
                    <Text>Hello</Text>

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

export  default  HomeController

const styles = StyleSheet.create({
    item:{
        height:75,
        padding: 20,
        fontSize:24,
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
    }
});