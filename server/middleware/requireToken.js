const jwt = require('jsonwebtoken')

const jwtkey = "azeazeaze";

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send({error:" you need to be logged"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtkey)
}