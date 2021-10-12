const express = require("express");
const payrouter=express.Router();
const stripeMethod=require("../controller/pay");

payrouter.post("/",stripeMethod);
module.exports=payrouter