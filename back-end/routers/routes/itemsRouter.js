const express = require("express");
const authentication =require("../middlewares/authentication")

const {
  getAllItems,
  createNewItem,
  getItemsByID,
  deleteItemById,
} = require("../controllers/itemsController");
const itemsRouter = express.Router();

itemsRouter.get("/",authentication, getAllItems);
itemsRouter.get("/:itemId", getItemsByID);
itemsRouter.delete("/:itemId", deleteItemById);

itemsRouter.post("/",authentication, createNewItem);

module.exports = itemsRouter;
