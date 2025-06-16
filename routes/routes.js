const express =require("express");
const router = express.Router();
const loginController = require("../controller/login.controller");
const JWT = require("../middleware/jwt");


const validateToken = JWT.validateToken;









// Channel Module
router.post("/login",loginController.login);

router.get("/sample",validateToken,loginController.sample);

router.get("/getToken", JWT.getToken);




module.exports= router;