const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken');
const { Error } = require("mongoose");

const validateToken = asyncHandler((req, resp, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err , decodedValue) => {
            if(err){
                resp.sendStatus(401)
                throw new Error("User is not authorized")
            }
            // req.admin = decodedValue.admin
            next()
            
        } )
    }
})

module.exports = validateToken;