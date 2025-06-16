const express = require("express");
const route = require("../routes/routes")

var router = express.Router();
 router.use("/",route)

module.exports= router;