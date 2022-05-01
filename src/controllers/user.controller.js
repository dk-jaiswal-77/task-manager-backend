const express = require("express");

// router
const router = express.Router();

// importing User model
const User = require("../models/user.model");

// express-validator
const {body, validationResult} = require("express-validator");

// jwt
const jwt = require("jsonwebtoken");
// bcrypt 
const bcrypt = require("bcrypt");

// CRUD operations
// post // registering user
router.post("/register", 
    body("name").notEmpty().isString().isLength({min:3, max:25}),
    body("email").notEmpty().isEmail().custom(async (value) => {
        try{
            const user = await User.findOne({email : value});
            
            if(user){
                return Promise.reject('E-mail already in use');
            }
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }), 
    body("password").notEmpty().isAlphanumeric().isLength({min : 3, max : 25}), 
    async(req, res) => {
        try{
            let errors = validationResult(req);
            
            if(!errors.isEmpty())
            {
                return res.status(400).json({status : false, error : errors.array()});
            }
            // validation successful
            await User.create(req.body);
            res.status(200).json({status : true, error : false});
        }catch(error){
            console.log(error.message);
            res.status(400).json({status : false, error : error.message});
        }
    }
);

// post // logging user
router.post("/login", async(req, res) => {
    try{
        let user = await User.findOne({email : req.body.email}).lean().exec();
        if(user == null)
        {
            return res.json({status : false, error : "user does not exist!"});
        }

        // user exists // comparing password 
        const password_matched = await bcrypt.compare(req.body.password, user.password);
        if(!password_matched)
        {
            // password did not match
            return res.json({status : false, error : "invalid email or password!"});
        }

        // password also matched // creating and sending token 
        let payload = {
            name : user.name, 
            email : user.email, 
            userId : user._id
        };
        // token = header.payload.signature
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.json({status : true, token});

    }catch(error){
        console.log(error);
        res.json({status : false, error});
    }
});



// exporting router
module.exports = router;