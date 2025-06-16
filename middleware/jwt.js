
require('dotenv').config();
const jwt = require('jsonwebtoken');


// Load environment variables at the beginning of your application
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET;
const EXPIRY = process.env.JWT_EXPIRY;
const REFRESH_EXPIRY = process.env.REFRESH_JWT;



exports.validateToken = (req, res, next) => {
    console.info("Inside Validate Token");

    try {

        const authHeader = req.headers['authorization'];

        if (!authHeader) return res.status(401).json({ success: false, error: 'JWT Token Required' });

        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) return res.status(401).json({ success: false, error: 'JWT Token is Invalid.' });


        // Verify the token using JWT
        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (err) {
            console.error(err);
            return res.status(403).json({ success: false, message: "Invalid Token" });
        }

        next();

    } catch (error) {

        console.error("Internal Server Error", error);
        return res.status(500).json({ status: false, message: "Internal Server Error", error })

    }

}

exports.generateAccessToken = async (params, res) => {
    console.info("Inside generate Token");

    try {
        console.log("req", typeof EXPIRY)

        if (!params) return res.status(400).json({ status: false, message: "Please Provide Username" });

        let expiry = '1h';

        const AccessToken = jwt.sign({ username: params }, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });
        console.log("AccessToken", AccessToken);


        return AccessToken;

    } catch (error) {
        console.error("Interna Server Error While Generating AccessToken", error);
        return res.status(500).json({ status: false, message: error })

    }
}


exports.generateRefreshToken = async (params, res) => {
    console.info("Inside verify-jwt middleware : generateRefreshToken")
    try {

        const token = jwt.sign({ username: params }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRY });

        return token;
    } catch (error) {
        console.error("Error while generating refresh token:", error);
        if (!res.headersSent) return res.status(500).json({ status: false, message: error })
    }
}

exports.getToken = async (req, res) => {
    console.info("Inside verify-jwt middleware : getToken");
    try {
        // let refreshToken = req.query.refreshToken;
        // const cookie = req.cookies;
        // if (!cookie?.refreshToken) return res.status(403).send({ status: false, message: 'Please provide refreshToken' });
        // console.log("refreshToken", cookie.refreshToken);
        // const refreshToken = cookie.refreshToken;

        const { refreshToken, username } = req.query;

        console.log("refreshToken",refreshToken)

                console.log("username",username)

        // Evaluate Refresh Token
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err) => {
            if (err) {
                return res.status(403).send({ status: false, message: "Invalid Token" });
            }


            // Generate new Access Token
            const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });

            return res.status(200).json({ status: true, message: "", accessToken })
        });


    } catch (error) {
        console.error('Inside JWT: getToken Api : Error while  generating  token:', error.message);
        return res.status(500).json({ status: false, message: error })
    }

}

