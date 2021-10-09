const express = require("express");
const bidsRouter = express.Router();
const authentication = require("../middlewares/authentication");

const {
  createBid,
  getBids,
  deleteBidById,
  updateBidById,
} = require("../controllers/bidsController");

bidsRouter.post("/", createBid);
bidsRouter.get("/", getBids);
bidsRouter.delete("/:bid_id", deleteBidById);
bidsRouter.put("/:bid_id", updateBidById);

module.exports = bidsRouter;
