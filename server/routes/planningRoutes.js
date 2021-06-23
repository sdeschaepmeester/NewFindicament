const express = require('express');
const planning = require('../Model/PlanningModel')// calling file with sql method
const planningRouter = express.Router();

planning.get('/getPlanning', async (req,res)=>{
    try{
        let historyTable = await planning.getPlanning()
        res.send(planningTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }


})


PlanningRouter.post('/deletePlanning', async (req,res)=>{
    const {cip} = req.body
    try{
        await history.deletePlanning(cip)
        return res.send("Deleted")

    }catch (err){
        return res.status(400).send({error :"The Cip id are not good "+err.message})
    }


})

PlanningRouter.post('/insertPlanning', async (req,res)=>{
    const {cip,name} = req.body
    try{
        // je verifie si les mots de passe sont les mêmes
        await history.inserPlanning(cip,name)
        return res.send("Inserted")

    }catch (err){
        return res.status(400).send({error :"Cannot insert Check if the argument are good " +err.message})
    }


})

module.exports = planningRouter
