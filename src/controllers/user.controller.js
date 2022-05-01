const express = require("express");

// router
const router = express.Router();

// importing User model
const User = require("../models/user.model");

// express-validator
const {body, validationResult} = require("express-validator");

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
})



// exporting router
module.exports = router;