const mongoose = require("mongoose");

// bcrypt
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true}, 
    password : {type : String, required : true}
}, {versionKey : false, timestamps : true});

userSchema.pre("save", async function (next){
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        console.log(error);
    }
});

module.exports = mongoose.model("user", userSchema);
