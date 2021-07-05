import React from "react";

import {StyleSheet} from "react-native";
import {IconButton,Colors} from "react-native-paper";

const checkIfExist = async (cip) => {
    try {
        let ifExist = await fetch('http://192.168.1.83:3000/checkIfExist', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cip: cip,
            }),
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData[0].nb)
                )

            })
            .done();
        return ifExist;
    } catch (e) {
        console.warn("Cannot insert to history")
    }


}

const insertFavorite = (cip,name) =>{
    try{
        fetch('http://192.168.1.83:3000/insertFavorite', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cip: cip,
                name: name
            }),
        });
    }catch (e){
        console.warn("Cannot insert to history")
    }
}

const AddToFavorite = ({cip,title})=>{

    console.log("if exist")
    console.log(checkIfExist(cip))

    return (
        <IconButton
            icon="star"
            style={ checkIfExist(cip) >= 1 ? styles.textValid : styles.textInvalid}
            size={20}
            onPress={() => insertFavorite(cip,title)}
        />
    );

}

export default AddToFavorite

const styles = StyleSheet.create({

    textValid: {
        color: 'red',
    },
    textInvalid: {
        color: 'grey',
    },
});