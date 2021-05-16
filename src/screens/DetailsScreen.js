import React, {Component, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,StatusBar } from 'react-native';
import styled, { createGlobalStyle } from "styled-components";
import {Picker} from "@react-native-picker/picker";
import {SafeAreaConsumer} from "react-native-safe-area-context";




class DetailsScreen extends Component {



    state = {
        choosenIndex: 1,
        notice: "desc"
    };

    parser(data){
        let notice = data.split("\n");
        let title = "";
        let description = "";
        let pathology = "";
        let sideEffect = "";
        let component = "";
        let printData = false;
        notice.forEach((value) => {
            if(value.includes("4. QUELS SONT LES")){
               // console.log(value)
                printData = true

            }
            if(value.includes("5.")){
                //console.log("stop")
                printData= false;
            }
            if(printData)
                sideEffect += " "+ value;
        });
        if(notice[2] == "Dénomination du médicament"){
            title = notice[3];
        }
        //console.log("dara Side effect "+ sideEffect)
        return sideEffect;
    }

    componentDidMount() {
        this.changeView()
    }

    componentDidUpdate() {
        this.changeView()
    }

    onPickerValueChange=(value, index)=>{
        console.log('Picker : '+value.notice)
        this.setState({notice :value.itemValue})
    }

    changeView(){
        let data = this.parser(this.props.valueFromParent["description"])
        let typeNotice = this.state.notice
        if(typeNotice == "desc"){
            return this.showDescription(data);
        }else if(typeNotice == "pat"){
            return this.showPathology(data);
        }else if(typeNotice == "es"){
            return this.showSideEffect(data);
        }else if(typeNotice == "com"){
            return this.showComponent(data);
        }
    }


    showDescription(data) {
        console.log("data to print")

        console.log(data)

        return (
            <View>
                <Text style={styles.text}>
                    {data}
                </Text>

            </View>
        )
    }
    showPathology(data) {

        return (
            <View>
                <Text>showPathologie</Text>
            </View>
        )
    }
    showSideEffect(data) {

        return (
            <View>
                <Text>showSideEffect</Text>
            </View>
        )
    }
    showComponent(data) {

        return (
            <View>
                <Text>showComponent</Text>
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
                            <Picker.Item  label="Description" value="desc" />
                            <Picker.Item label="Pathologie" value="pat" />
                            <Picker.Item label="Effets Secondaires" value="es" />
                            <Picker.Item label="Composants" value="com" />
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