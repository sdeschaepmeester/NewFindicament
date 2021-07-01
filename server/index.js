const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const drugRoutes = require("./routes/drugRoutes");
const planningRoutes = require("./routes/planningRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const app = express();
const requireToken = require('./middleware/requireToken');
const PORT = process.env.PORT || 3000;
const cors = require('cors')  //use this


app.use(bodyParser.json())
app.use(cors({credentials: true, origin: true}));


app.use(historyRoutes)
app.use(authRoutes)

app.use(drugRoutes)
app.use(planningRoutes)
app.use(favoriteRoutes)


app.get('/',requireToken,(req,res)=>{
    res.send("yout email is "+ req.user.password)
});

app.listen(PORT, ()=>{
    console.log("Server is reading at "+ PORT);
})