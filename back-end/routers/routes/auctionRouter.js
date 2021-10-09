const express = require("express");
const auctionsRouter = express.Router();
const authentication = require("../middlewares/authentication");

const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  deleteAuctionById,
} = require("../controllers/auctionsController");

auctionsRouter.post("/", createAuction);
auctionsRouter.get("/", getAllAuctions);
auctionsRouter.put("/:auction_id", getAuctionById);
auctionsRouter.delete("/:auction_id", deleteAuctionById);

module.exports = auctionsRouter;
