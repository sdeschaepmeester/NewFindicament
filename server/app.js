
const express = require("express");
const app = express();

const PORT = 8080;

app.get("/",(req,res)=>{
    res.send("Yoo")
})

app.listen(PORT, ()=>{
    console.log("Server is reading at "+ PORT);
})