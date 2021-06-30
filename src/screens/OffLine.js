import React from "react";
import {StyleSheet, Text, View} from "react-native";

let OffLine= ()=>{

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Vous n'arrivez pas à vous connecter à Findicament
            </Text>
        </View>

    )

}

export default OffLine

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1
    },
    text: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 24,

    },
});
