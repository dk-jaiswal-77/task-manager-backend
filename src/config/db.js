const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

module.exports = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("connected to db!");
    }catch(error){
        console.log(error.message);
    }
}