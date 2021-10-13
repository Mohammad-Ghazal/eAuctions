const express = require("express");
const auctionsRouter = express.Router();
const authentication = require("../middlewares/authentication");

const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  editAuctionById,
  deleteAuctionById,
  getAuctionsByUserId,
} = require("../controllers/auctionsController");

auctionsRouter.post("/", authentication, createAuction);
auctionsRouter.get("/", getAllAuctions);
auctionsRouter.get("/user_auctions", authentication, getAuctionsByUserId);
auctionsRouter.get("/:auction_id", getAuctionById);
auctionsRouter.put("/:auction_id", editAuctionById);

auctionsRouter.delete("/:auction_id", deleteAuctionById);

module.exports = auctionsRouter;
