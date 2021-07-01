import React, { Component, useEffect, useState } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import AddToFavorite from "../components/AddToFavorite";

class DetailsScreen extends Component {


    state = {
        choosenIndex: 1,
        notice: "pos",
        description: null,
        bgImage: { uri: "https://zupimages.net/up/21/21/2t7p.png" }
    };

    /**
     * When the request are done the description state get the new value.
     * Thanks to that when we render we have the description data from the query.
     * So we can use async.
     * @param code_cip
     * @returns {Promise<void>}
     */
    async getDrugById(code_cip) {
        const descriptionResponses = await fetch('http://10.0.2.2:3000/getDrugById', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code_cip: code_cip
            }),
        })
            .then(res => res.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        const description = descriptionResponses[0].notice
        this.setState({ description: description })
    }

    /**
     * Parse the notice to different sub part getting what part are selected
     * @param data
     * @param type (what part of the notice are selected)
     * @returns {string}
     */
    parser(description, type) {
        let notice = description.split("\n");
        let component = "";
        let printData = false;
        notice.forEach((value) => {
            if (type == "pos") {
                if (value.includes("3. COMMENT PRENDRE") || value.includes("3. COMMENT prendre") || value.includes("3. COMMENT UTILISER")) {
                    printData = true
                }
                if (value.includes("4. QUELS SONT LES")) {
                    printData = false;
                }
                this.state.bgImage = { uri: "https://zupimages.net/up/21/21/1w5n.png" };

            } else if (type == "pat") {
                if (value.includes("1. QU’EST-CE QUE")) {
                    printData = true
                }
                if (value.includes("2. QUELLES SONT LES INFORMATIONS A CONNAITRE AVANT")) {
                    printData = false;
                }
                this.state.bgImage = { uri: "https://zupimages.net/up/21/21/b84v.png" };
            } else if (type == "es") {
                if (value.includes("4. QUELS SONT LES")) {
                    printData = true
                }
                if (value.includes("5. COMMENT CONSERVER")) {
                    printData = false;
                }
                this.state.bgImage = { uri: "https://zupimages.net/up/21/21/zr5h.png" };
            } else if (type == "com") {
                if (value.includes("6. CONTENU DE L’EMBALLAGE")) {
                    printData = true
                }
                if (value.includes("Titulaire de l’autorisation")) {
                    printData = false;
                }
                this.state.bgImage = { uri: "https://zupimages.net/up/21/21/2t7p.png" };
            } else if (type == "dang") {
                if (value.includes("2. QUELLES SONT LES INFORMATIONS A CONNAITRE AVANT")) {
                    printData = true
                }
                if (value.includes("3. COMMENT PRENDRE") || value.includes("3. COMMENT prendre") || value.includes("3. COMMENT UTILISER")) {
                    printData = false;
                }
                this.state.bgImage = { uri: "https://zupimages.net/up/21/21/qohb.png" };
            }

            if (printData)
                component += "\n" + value;
        });
        if (notice[2] == "Dénomination du médicament" && type == "title") {
            component = notice[3];
        }
        return component;
    }

    /**
     * We call at the beginning the query and change the body of the notice
     */
    async componentDidMount() {

        console.log("details Hello ")

        if(this.props.valueFromParent != null){
            await  this.getDrugById(this.props.valueFromParent)

        }
        else {//Home
            await this.getDrugById(this.props.route.params.codeCIP)

        }


    }

    /**
     * Just need to call the function which one change the body with the description.
     */
    componentDidUpdate() {
        this.changeView(this.state.description)
    }


    /**
     * We got which notice are selected and parse them.
     * Next to return the render method pathing the notice and the title of the drug.
     * @param description
     * @returns {View}
     */
    changeView(description) {
        let typeNotice = this.state.notice
        let data = this.parser(description, typeNotice)
        let title = this.parser(description, "title")
        if (typeNotice != "") {
            return this.showComponent(data, title);
        }
    }


    showComponent(data, title) {
        return (
            <View style={{backgroundColor:"white"}}>
                <Image style={styles.image} source={this.state.bgImage} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.noticeText}>{data}</Text>
            </View>
        )
    }

    render() {
        const { description } = this.state;
        console.log("param")
        console.log(this.props.route.params)

        return (
            <View >
                <SafeAreaView>
                    <View style={styles.container}>
                        <AddToFavorite cip={this.props.route.params.codeCIP} title={this.props.route.params.name}   />

                        <Text>Parcourir la notice : </Text>

                        <View style={styles.dropDown} >
                            <Picker style={styles.pickerStyle}
                                selectedValue={this.state.notice}
                                onValueChange={(itemValue, itemPosition) => this.setState({ notice: itemValue, choosenIndex: itemPosition })}
                                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                            >
                                <Picker.Item label="Posologie" value="pos" />
                                <Picker.Item label="Pathologie" value="pat" />
                                <Picker.Item label="Effets Secondaires" value="es" />
                                <Picker.Item label="Composants" value="com" />
                                <Picker.Item label="Danger" value="dang" />
                            </Picker>
                        </View>
                    </View>
                </SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    {description ?
                        <View>{this.changeView(description)}</View> :
                        <Text>Chargement...</Text>
                    }

                </ScrollView>
            </View>
        )
    }
}

export default DetailsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center'
    },
    notice: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 50
    },
    noticeText: {
        textAlign: 'justify',
        alignSelf: 'stretch',
        fontSize: 18,
        lineHeight: 25,
        marginRight: 10
    },
    pickerStyle: {
        height: 50,
        color: '#344953',
        justifyContent: 'center',
        textAlign: 'center',


    },
    itemPicker: {
        fontSize: 15,
        height: 75,
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    dropDown: {
        height: 50,
        width: "60%",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white'
    }
    ,
    button: {
        height: 30,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        padding: 5
    },
    scrollView: {
        marginTop: 50,
        marginBottom: 220,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        margin: 0,
        height: 100,
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: '#00affb'
    },
    card: {
        width: '100%',
    }
});
