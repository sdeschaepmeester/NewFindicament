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
        const isTheSamePassword = await db.comparePassword(user.password,password)
        console.log("pass"+isTheSamePassword)
        if(!isTheSamePassword){
            return res.status(422).send({error :"password does not match"+password})
        }
        console.log("pass"+isTheSamePassword)
        const token = jwt.sign({userId:user.id},jwtkey)
        console.log("ready to insert");
        res.send(token)
    }catch (err){
        return res.status(422).send({error :"password does not match"})
    }

})





module.exports = router

