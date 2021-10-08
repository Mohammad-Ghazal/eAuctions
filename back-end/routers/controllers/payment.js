const connection = require("../../db/db");
//payment method
const paymentMethod = (req, res) => {
  const { payment_type } = req.body;
  const insertPaymentMethod = `INSERT INTO  payments (payment_type) VALUES (?)`;
  const data = [payment_type];
  connection.query(insertPaymentMethod, data, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    if (result) {
      res.status(201).json({ result: result });
    }
  });
};

module.exports = paymentMethod;
