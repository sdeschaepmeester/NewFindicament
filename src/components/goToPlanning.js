import React from "react";


/* export let successAddTreatment = ({navigation},values) => {
    insertToPlanning(values)
} */

export let insertToPlanning = (name,comment,start_date) => {
    try{
        fetch('http://192.168.1.83:3000/insertPlanning', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                comment: comment,
                start_date: start_date
            }),
        });
    }catch (e){
        console.warn("Cannot insert to planning")
    }

}