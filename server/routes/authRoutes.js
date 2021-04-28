const express = require('express');
const db = require('../db.js')// calling file with sql method
const jwt = require("jsonwebtoken");
const router = express.Router();

const jwtkey = "azeazeaze";

router.post("/signup",async(req,res,next)=>{
    const {email,password}= req.body;
    try{
        await db.insert(email,password)
        let _id = await db.getByEmail(email)
        const token = jwt.sign({userId:_id.id},jwtkey)
        console.log("lid : "+ _id.id+ " toekn "+token);
        res.send(token)
    }catch (err){
        res.status(422).send(err.message)
    }
    //console.log(res.json(result))
})

module.exports = router

