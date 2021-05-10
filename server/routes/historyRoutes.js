const express = require('express');
const history = require('../Model/HistoryModel')// calling file with sql method
const historyRouter = express.Router();

historyRouter.post('/deleteHistory', async (req,res)=>{
    const {cip} = req.body
    console.log("ok"+cip)
    //res.send(cip)

    try{
        await history.deleteHistory(cip)
        return res.send("Deleted")

    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }


})

historyRouter.post('/insertHistory', async (req,res)=>{
    const {cip,name} = req.body
    console.log("ok"+cip)
    //res.send(cip)

    try{
        // je verifie lsi les mots de passe sont les mêmes
        await history.insertHistory(cip,name)
        return res.send("Inserted")

    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }


})

module.exports = historyRouter
