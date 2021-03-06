const express = require('express');
const history = require('../Model/HistoryModel')// calling file with sql method
const historyRouter = express.Router();

historyRouter.get('/getHistory/:offsetId', async (req,res)=>{
    let {offsetId} = req.params
    try{
        let historyTable = await history.getHistory(parseInt(offsetId),global.id_user)
        res.send(historyTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }


})


historyRouter.post('/deleteHistory', async (req,res)=>{
    const {cip} = req.body
    try{
        await history.deleteHistory(cip,global.id_user)
        return res.send("Deleted")

    }catch (err){
        return res.status(400).send({error :"The Cip id are not good "+err.message})
    }


})

historyRouter.post('/insertHistory', async (req,res)=>{
    const {cip,name} = req.body

    try{
        // je verifie si les mots de passe sont les mêmes
        await history.insertHistory(cip,name,global.id_user)
        return res.send("Inserted")

    }catch (err){
        return res.status(400).send({error :"Cannot insert Check if the argument are good " +err.message})
    }


})




module.exports = historyRouter
