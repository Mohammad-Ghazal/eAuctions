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
const { isBidExist } = require("../controllers/bidsController");

auctionsRouter.post("/", authentication, createAuction);
auctionsRouter.get("/", getAllAuctions);
auctionsRouter.get("/user_auctions", authentication, getAuctionsByUserId);
auctionsRouter.get("/:auction_id", getAuctionById);
auctionsRouter.put("/:auction_id", isBidExist, editAuctionById);
auctionsRouter.delete("/:auction_id", deleteAuctionById);

module.exports = auctionsRouter;
