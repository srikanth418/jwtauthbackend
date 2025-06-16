const loginModel = require("../models/loginModel")

const login=async (req,res)=>{
    try {
   // const response =  await channelModel.saveClientChannels(req,res);
   //  res.send(response)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = {login}