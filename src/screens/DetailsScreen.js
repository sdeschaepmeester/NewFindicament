import React, {Component, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,StatusBar } from 'react-native';
import styled, { createGlobalStyle } from "styled-components";
import {Picker} from "@react-native-picker/picker";
import {SafeAreaConsumer} from "react-native-safe-area-context";




class DetailsScreen extends Component {



    state = {
        choosenIndex: 1,
        notice: "pos"
    };

    parser(data,type){
        let notice = data.split("\n");
        let title = "";
        let component = "";
        let printData = false;
        console.log(notice)
        notice.forEach((value) => {
            if(type == "pos"){
                if(value.includes("3. COMMENT PRENDRE") || value.includes("3. COMMENT prendre") || value.includes("3. COMMENT UTILISER")){
                    printData = true
                }
                if(value.includes("4. QUELS SONT LES")){
                    printData= false;
                }
            }else if(type == "pat"){
                if(value.includes("1. QU’EST-CE QUE")){
                    printData = true
                }
                if(value.includes("2. QUELLES SONT LES INFORMATIONS A CONNAITRE AVANT")){
                    printData= false;
                }
            }else if(type == "es"){
                if(value.includes("4. QUELS SONT LES")){
                    printData = true
                }
                if(value.includes("5. COMMENT CONSERVER")){
                    printData= false;
                }
            }else if(type == "com"){
                if(value.includes("6. CONTENU DE L’EMBALLAGE")){
                    printData = true
                }
                if(value.includes("Titulaire de l’autorisation")){
                    printData= false;
                }
            }else if(type == "dang"){
                if(value.includes("2. QUELLES SONT LES INFORMATIONS A CONNAITRE AVANT")){
                    printData = true
                }
                if(value.includes("3. COMMENT PRENDRE") || value.includes("3. COMMENT prendre") || value.includes("3. COMMENT UTILISER")){
                    printData= false;
                }
            }

            if(printData)
                component += " "+ value;
        });
        if(notice[2] == "Dénomination du médicament"){
            title = notice[3];
        }
        //console.log("dara Side effect "+ sideEffect)
        return component;
    }

    componentDidMount() {
        this.changeView()
    }

    componentDidUpdate() {
        this.changeView()
    }



    changeView(){
        let typeNotice = this.state.notice

        let data = this.parser(this.props.valueFromParent["description"],typeNotice)
        if(typeNotice == "pos"){
            return this.showComponent(data);
        }else if(typeNotice == "pat"){
            return this.showComponent(data);
        }else if(typeNotice == "es"){
            return this.showComponent(data);
        }else if(typeNotice == "com"){
            return this.showComponent(data);
        }else if(typeNotice == "dang"){
            return this.showComponent(data);
        }
    }


    showComponent(data) {

        return (
            <View>
                <Text style={styles.noticeText}>
                    {data}
                </Text>
            </View>
        )
    }

//onValueChange={(itemValue, itemPosition) =>
//                                     this.setState({language: itemValue, choosenIndex: itemPosition})}
    render() {
        //console.log(this.props.valueFromParent.descritption)
        //let title = this.parser(this.props.valueFromParent["description"]);

        return(
            <View >
                <SafeAreaView>
                <View style={styles.container}>
                    <Text>Parcourir la notice :</Text>
                    <View style={styles.dropDown} >
                        <Picker style={styles.pickerStyle}
                                selectedValue={this.state.notice}
                                onValueChange={(itemValue, itemPosition) => this.setState({notice: itemValue, choosenIndex: itemPosition})}
                                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                        >
                            <Picker.Item  label="Posologie" value="pos" />
                            <Picker.Item label="Pathologie" value="pat" />
                            <Picker.Item label="Effets Secondaires" value="es" />
                            <Picker.Item label="Composants" value="com" />
                            <Picker.Item label="Danger" value="dang" />
                        </Picker>
                    </View>
                </View>
            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                {this.changeView()}

            </ScrollView>

            </View>
        )

    }
}

export default DetailsScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center'
    },
    notice:{
        flex: 1,
        marginTop:50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 50
    },
    noticeText:{
        textAlign: 'justify',
        alignSelf: 'stretch',
        fontSize: 18,
        lineHeight: 25,
    },
    pickerStyle:{
        height: 50,
        color: '#344953',
        justifyContent: 'center',
        textAlign: 'center',


    },
    itemPicker:{
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
        marginTop:50,
        marginBottom: 220,
        marginHorizontal: 20,
    },

});