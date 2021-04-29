const express = require("express");
const bodyParser = require('body-parser');
const db = require('./db.js')// calling file with sql method
const authRoutes = require("./routes/authRoutes");
const app = express();
const requireToken = require('./middleware/requireToken');
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(authRoutes)

/*
app.get("/",(req,res)=>{
    console.log(req.body)
    res.send("Yoo")
})*/


app.get('/',requireToken,(req,res)=>{
    res.send("yout email is "+ req.user.password)
});

app.listen(PORT, ()=>{
    console.log("Server is reading at "+ PORT);
})