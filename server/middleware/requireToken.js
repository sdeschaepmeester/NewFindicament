const jwt = require('jsonwebtoken')
const db = require('../db.js')// calling file with sql method

const jwtkey = "azeazeaze";

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send({error:" you need to be logged"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtkey,async (err,playload)=>{
        if(err){
            return res.status(401).send("error you must be logged in ")
        }
        //return res.send("what is playload "+ playload)
        const {userId} = playload
        const user = await db.one(userId);
        req.user = user;
        next();
    })
}