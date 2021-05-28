import React from "react";


export let moreDetails = ({navigation},codeCIP,name) => {
    navigation.navigate('Details', {
        codeCIP: codeCIP
    })


    insertToHistory(codeCIP,name)
}



const insertToHistory = (cip,name) => {
    try{
        fetch('http://10.0.2.2:3000/insertHistory', {
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


