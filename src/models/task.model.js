const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, required : true},
    title : {type : String, required : true},
    description : {type : String, required : true},
    status : {type : String, required : true},
    official : {type : Boolean, required : true},
    personal : {type : Boolean, required : true},
    others : {type : Boolean, required : true},
    subtasks : [{type : Object, required : true}]
}, {versionKey : false, timestamps : true});

module.exports = mongoose.model("task", taskSchema);
