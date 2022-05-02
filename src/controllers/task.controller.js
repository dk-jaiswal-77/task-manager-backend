const express = require("express");
const { route } = require("./user.controller");

// router
const router = express.Router();

// importing model
const Task = require("../models/task.model");

// CRUD operations
// post // saving tasks
router.post("/", async(req, res) => {
    try{
        await Task.create(req.body);
        res.json({status : true});
    }catch(error){
        console.log(error);
        res.json({status : false, error});
    }
})

// get // getting tasks of specified user /:userId
router.get("/:userId", async (req, res) => {
    try{
        const tasks = await Task.find({userId : req.params.userId}).lean().exec();
        res.json(tasks);
    }catch(error){
        console.log(error);
    }
})

// patch // updating specified task /:taskId
router.patch("/:taskId", async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.params.taskId, req.body).lean().exec();
        res.json({status : true});
    }catch(error){
        console.log(error);
    }
})



// exporting router
module.exports = router;