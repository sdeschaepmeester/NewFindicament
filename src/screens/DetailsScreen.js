import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import styled, { createGlobalStyle } from "styled-components";
import {Picker} from "@react-native-picker/picker";


class DetailsScreen extends Component {



    state = {
        choosenIndex: 0
    };

    parser(data){
        let notice = data.split("\n");
        let title = "";

        if(notice[2] == "Dénomination du médicament"){
            title = notice[3];
        }
        return title;
    }


    render() {
        //console.log(this.props.valueFromParent.descritption)
        let title = this.parser(this.props.valueFromParent["description"]);

        return(
            <View >
                <View style={styles.container}>
                    <Text>Parcourir la notice :</Text>
                    <View style={styles.dropDown} >
                        <Picker style={styles.pickerStyle}
                                selectedValue={this.state.language}
                                onValueChange={(itemValue, itemPosition) =>
                                    this.setState({language: itemValue, choosenIndex: itemPosition})}
                                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                        >
                            <Picker.Item  label="Description" value="desc" />
                            <Picker.Item label="Pathologie" value="pat" />
                            <Picker.Item label="Effets Secondaires" value="es" />
                            <Picker.Item label="Composants" value="com" />
                        </Picker>
                    </View>

                </View>

            </View>
        )

        /*return (
            <View style={styles.container}>
                <Text>Details Screen</Text>
                <Text style={styles.textStyle}>
                    Vous voici sur la page description du {title}
                </Text>
                <View>

                </View>

            </View>
        );*/
    }
}
/*
const DetailsScreen = ( {navigation,props}) => {

    console.log(props.dataFromParent)

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Text style={styles.textStyle}>
                Vous voici sur la page description de médicament lala
            </Text>
          
        </View>
    );
};
*/
export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center'
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

});