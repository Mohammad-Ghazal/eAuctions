const connection = require("../../db/db");

const createBid = (req, res) => {
  const { auction_id, date, bid_value } = req.body;
  //   const user_id = req.token.userId;
  const user_id = 1;

  const newBid = [auction_id, date, user_id, bid_value];
  const query = `INSERT INTO bids (auction_id, date, user_id,bid_value) values (?,?,?,?)`;

  connection.query(query, newBid, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `success new bid added`,
      result: result,

      // bid: {
      //   bid_id:result
      // auction_id: result.insertId,
      // date: title,
      // user_id: details,
      // bid_value: image,

      //   },
    });
  });
};

const getBids = (req, res) => {
  const query = `SELECT * FROM bids`;
  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    // if (result.length===0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `there is no item added yet`,
    //     });
    //   }
    res.status(200).json({
      success: true,
      message: `all bids`,
      result: result,
    });
  });
};

const deleteBidById = (req, res) => {
  const bid_id = req.params.bid_id;
  const query = `DELETE FROM bids WHERE bid_id =${bid_id}`;

  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `bid with id ${bid_id} does not exist`,
      });
    }
    res.status(202).json({
      success: true,
      message: `Success Delete bid with id => ${bid_id}`,
      result: result,
    });
  });
};

const updateBidById = (req, res) => {
  const { bid_value } = req.body;

  const bid_id = req.params.bid_id;
  const query = `UPDATE bids SET bid_value = ${bid_value} WHERE bid_id = ${bid_id}`;

  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `bid with id ${bid_id} does not exist`,
        result: result,
      });
    }
    res.status(202).json({
      success: true,
      message: `Successfully updated bid with id => ${bid_id}`,
      result: result,
    });
  });
};
module.exports = {
  createBid,
  getBids,
  deleteBidById,
  updateBidById,
};
