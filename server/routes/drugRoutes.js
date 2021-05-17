const express = require('express');
const drug = require('../Model/DrugModel')// calling file with sql method
const drugRouter = express.Router();


drugRouter.get('/getDrugs', async (req,res)=>{

    try{
        let drugs = await drug.getDrugs()
        res.send(drugs)
    }catch (err){
        res.status(422).send(err.message)
    }

})

drugRouter.post('/getDrugById', async (req,res)=>{
    const {code_cip} = req.body;

    try{
        let drugs = await drug.getDrugById(code_cip)
        res.send(drugs)
    }catch (err){
        res.status(422).send(err.message)
    }

})


module.exports = drugRouter
