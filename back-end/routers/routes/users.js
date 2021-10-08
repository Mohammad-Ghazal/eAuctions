const express = require("express");
const userRouter = express.Router();
const addUser = require("../controllers/users");

userRouter.post("/", addUser);

module.exports = userRouter;
