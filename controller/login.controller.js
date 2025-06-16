const loginModel = require("../models/loginModel");
const JWT = require("../middleware/jwt");

exports.login = async (req, res) => {
    console.info("Inside Login Controller: Login Api")
    try {

        const { username, password } = req.body;

        const [AccessToken, RefreshToken] = await Promise.all([
            JWT.generateAccessToken(username, res),
            JWT.generateRefreshToken(username, res)
        ]
        );

        // const AccessToken = await JWT.generateAccessToken(username,res);


        console.log("AccessToken", AccessToken);
        console.log("RefreshToken", RefreshToken);

        return res.status(200).json({ status: false, message: "Loggedin successfully", data: { AccessToken, RefreshToken } });


    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

exports.sample = (req, res) => {


    try {

        return res.status(200).send({ data: "Hello" });

    } catch (error) {

    }

}




