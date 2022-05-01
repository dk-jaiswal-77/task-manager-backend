const express = require("express");

// dotenv
require("dotenv").config();

// express app
const app = express();

// port 
const PORT = process.env.PORT || 5005;

// connect to db!
const connect = require("./config/db");
connect();

// cors
const cors = require("cors");
app.use(cors());


// global middlewares
app.use(express.json());

// importing controllers
const userController = require("./controllers/user.controller");
const taskController = require("./controllers/task.controller");


// redirecting to respective controller
app.use("/users", userController);
app.use("/tasks", taskController);




// listening to port
app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
});