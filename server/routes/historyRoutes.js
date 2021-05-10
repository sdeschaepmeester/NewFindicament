const express = require('express');
const history = require('../Model/HistoryModel')// calling file with sql method
const historyRouter = express.Router();

historyRouter.get('/getHistory', async (req,res)=>{
    try{
        let historyTable = await history.getHistory()
        res.send(historyTable)
    }catch (err){
        return res.status(422).send({error :"Something wrong with the database"})
    }


})

historyRouter.get('/getHistory2',  (req,res)=>{
    try{
        let historyTable =  history.getHistory2()
        console.log("response all historic "+ historyTable)
        res.send("ouais")
    }catch (err){
        return res.status(422).send(err.message)
    }


})

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
