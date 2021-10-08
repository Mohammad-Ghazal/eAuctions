const express = require("express");
const favoritesUsersRouter = express.Router();
const {
  addFavoriteUser,
  removeFavoriteUser,
  getFavoriteUsers,
} = require("../controllers/favoritesUsersController");

favoritesUsersRouter.post("/", addFavoriteUser);
favoritesUsersRouter.delete("/", removeFavoriteUser);
favoritesUsersRouter.get("/", getFavoriteUsers);

module.exports = favoritesUsersRouter;
