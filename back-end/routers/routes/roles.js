const express=require("express");
const roleRouter=express.Router();
const newRole=require("../controllers/roles");

roleRouter.post("/",newRole);

module.exports=roleRouter;