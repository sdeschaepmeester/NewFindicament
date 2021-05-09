const express = require('express');
const db = require('../db.js')// calling file with sql method
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require('bcrypt');

const jwtkey = "azeazeaze";

router.post("/signup",async(req,res,next)=>{
    const {email,password}= req.body;
    try{
        let salt = await bcrypt.genSalt(10);

        let hashPass =bcrypt.hash = await bcrypt.hash(password,salt);
        console.log("hashed pass" + hashPass);
        await db.insert(email,hashPass)
        let _id = await db.getByEmail(email)
        const token = jwt.sign({userId:_id.id},jwtkey)
        console.log("lid : "+ _id.id+ " toekn "+token);
        res.send(token)
    }catch (err){
        res.status(422).send(err.message)
    }
    //console.log(res.json(result))
})


router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error: "need email or password "})
    }
    const user = await db.getByEmail(email)
    if(!user){
        return res.status(422).send({error :"email does not match"})
    }
    try{
        // je verifie lsi les mots de passe sont les mêmes
        const isTheSamePassword = await db.comparePassword(user.password,password)
        console.log("pass"+isTheSamePassword)
        if(!isTheSamePassword){
            return res.status(422).send({error :"password does not match"+password})
        }
        const token = jwt.sign({userId:user.id},jwtkey)
        console.log("ready to insert"+token);
        // renvoie le token de connexion unique
        res.send({token})
    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }

})


router.get('/getDrugs', async (req,res)=>{

    try{
        let drugs = await db.getDrugs()
        res.send(drugs)
    }catch (err){
        res.status(422).send(err.message)
    }

})

router.post('/getDrugById', async (req,res)=>{
    const {code_cip} = req.body;

    try{
        let drugs = await db.getDrugById(code_cip)
        res.send(drugs)
    }catch (err){
        res.status(422).send(err.message)
    }

})


router.post('/deleteHistory', async (req,res)=>{
    const {cip} = req.body
    console.log("ok"+cip)
    //res.send(cip)

    try{
        // je verifie lsi les mots de passe sont les mêmes
        await db.deleteHistory(cip)
        return res.send("Deleted")

    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }


})

router.post('/insertHistory', async (req,res)=>{
    const {cip,name} = req.body
    console.log("ok"+cip)
    //res.send(cip)

    try{
        // je verifie lsi les mots de passe sont les mêmes
        await db.insertHistory(cip,name)
        return res.send("Inserted")

    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }


})





module.exports = router

