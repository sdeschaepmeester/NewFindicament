const express = require('express');
const favorite = require('../Model/FavoriteModel')// calling file with sql method
const favoriteRouter = express.Router();


favoriteRouter.get('/getFavorite/:offsetId', async (req,res)=>{
    let {offsetId} = req.params

    try{
        let favoriteTable = await favorite.getFavorite(parseInt(offsetId))
        res.send(favoriteTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }


})
favoriteRouter.post('/checkIfExist', async (req,res)=>{
    const {cip} = req.body
    try{
        let favoriteTable = await favorite.CheckIfExist(cip)
        res.send(favoriteTable)
    }catch (err){
        return res.status(421).send({error :"Something wrong with the database : "+err.message})
    }


})


favoriteRouter.post('/deleteFavorite', async (req,res)=>{
    const {cip} = req.body
    try{
        await favorite.deleteFavorite(cip)
        return res.send("Deleted")

    }catch (err){
        return res.status(400).send({error :"The Cip id are not good "+err.message})
    }


})

favoriteRouter.post('/insertFavorite', async (req,res)=>{
    const {cip,name} = req.body
    try{
        // je verifie si les mots de passe sont les mêmes
        await favorite.insertFavorite(cip,name)
        return res.send("Inserted")

    }catch (err){
        return res.status(400).send({error :"Cannot insert Check if the argument are good " +err.message})
    }


})


module.exports = favoriteRouter
