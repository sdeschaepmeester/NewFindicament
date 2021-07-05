const express = require('express');
const planning = require('../Model/PlanningModel')// calling file with sql method
const planningRouter = express.Router();

planningRouter.get('/getPlanning', async (req,res)=>{
    try{
        let planningTable = await planning.getPlanning()
        res.send(planningTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }
})

planningRouter.get('/getPlanningDates', async (req,res)=>{
    try{
        let planningTable = await planning.getPlanningDates()
        res.send(planningTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }
})

planningRouter.post('/insertPlanning', async (req, res)=>{
    const {name,comment,start_date} = req.body
    try{
        await planning.insertPlanning(name,comment,start_date)
        return res.send("Inserted")

    }catch (err){
        return res.status(400).send({error :"Cannot insert Check if the argument are good " +err.message})
    }
})


module.exports = planningRouter
