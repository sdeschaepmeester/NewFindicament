import React from "react";


/* export let successAddTreatment = ({navigation},values) => {
    insertToPlanning(values)
} */

export let insertToPlanning = (name,comment,start_date) => {
    try{
        fetch('http://10.0.2.2:3000/insertPlanning', {
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