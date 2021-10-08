const express=require("express");
const paymentRouter=express.Router();
const paymentMethod=require("../controllers/payment");

paymentRouter.post("/",paymentMethod);

module.exports=paymentRouter;