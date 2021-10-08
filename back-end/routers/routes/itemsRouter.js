const express = require("express");
const {
  getAllItems,
  createNewItem,
  getItemsByID,
  deleteItemById,
} = require("../controllers/itemsController");
const itemsRouter = express.Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/:itemId", getItemsByID);
itemsRouter.delete("/:itemId", deleteItemById);

itemsRouter.post("/", createNewItem);

module.exports = itemsRouter;
