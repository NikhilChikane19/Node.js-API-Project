const asyncHandler = require("express-async-handler")
const Admin = require("../models/adminModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getAdmins = asyncHandler(async(req, resp) => {
    const admin = await Admin.find();
    // console.log('data', product);
    resp.send(admin);
})

const adminRegister = asyncHandler(async (req, resp) => {
    const { adminName, email, password } = req.body;
    if (!adminName || !email || !password) {
        resp.send(400);
        throw new Error("All Fields are required");
    }

    const adminAvailable = await Admin.findOne({ email })
    if (adminAvailable) {
        resp.sendStatus(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const admin = await Admin.create({
        name : adminName ,
        email,
        password: hashedPassword
    })
    
    if(admin){
        resp.status(201).json({_id: admin.id , email : admin.email})
    }else{
        resp.status(400);
        throw new Error("Something Wrong");
    }
})


const adminLogin = asyncHandler(async (req, resp) => {
    const {email , password} = req.body;
    if(!email || !password){
        resp.sendStatus(400);
        throw new Error("Field are mandetory");
    }

    const admin = await Admin.findOne({email})

    if(admin && (await bcrypt.compare(password, admin.password))){

        const accessToken = jwt.sign({
            admin : {
                name : admin.name,
                email : admin.email,
                id : admin.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1d"}
        )
        resp.json({accessToken});
    }else{
        resp.sendStatus(401);
        throw new Error("Email and password are not valid")
    }
})

const currentAdmin = asyncHandler(async (req, resp) => {
    resp.json({message : "Current user found"})
})

module.exports = {getAdmins, adminRegister, adminLogin, currentAdmin }