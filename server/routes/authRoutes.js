const express = require('express');
const auth = require('../Model/AuthModel')// calling file with sql method
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
        await auth.insert(email,hashPass)
        let _id = await auth.getByEmail(email)
        const token = jwt.sign({userId:_id.id},jwtkey)
        res.send(token)
    }catch (err){
        res.status(421).send(err.message)
    }
    //console.log(res.json(result))
})


router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).send({error: "need email or password "})
    }
    const user = await auth.getByEmail(email)

    if(!user){
        return res.status(400).send({error :"email does not match"})
    }
    try{
        // je verifie lsi les mots de passe sont les mêmes
        const isTheSamePassword = await auth.comparePassword(user.password,password)
        if(!isTheSamePassword){
            return res.status(400).send({error :"password does not match :"+password})
        }
        const token = jwt.sign({userId:user.id},jwtkey)
        //console.log("ready to insert"+token);
        // renvoie le token de connexion unique
        res.send({token})
    }catch (err){
        return res.status(421).send({error :"Something wrong in the process : "+ err.message})
    }

})




module.exports = router

