
const express =require("express");
const app = express();
require("dotenv").config()
app.use(express.json()); // for JSON 
const  cors = require("cors")
const routeConig = require("./routeconfig/routeConfig")




app.use(cors());
app.use("/api",routeConig)
const port = process.env.PORT;

app.listen(port,()=>{
    console.log("--->listen",port);
})