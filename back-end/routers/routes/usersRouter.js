const express = require("express");
const usersRouter = express.Router();
const addUser = require("../controllers/usersController");

usersRouter.post("/", addUser);

module.exports = usersRouter;
