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




// exporting router
module.exports = router;