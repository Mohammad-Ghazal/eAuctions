const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../../db/db");
require("dotenv").config();
//create login user
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE email = ?`;
  connection.query(query, [email], async (err, result) => {
    if (!result.length) {
      res
        .status(404)
        .json({ success: false, message: `The email doesn't exist ` });
    } else {
      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) {
        res.status(404).json({
          success: false,
          message: `The password you’ve entered is incorrect `,
        });
      }
      const payload = {
        userId: result[0].user_id,
        paymentRef: result[0].payment_ref,
        userName: result[0].user_name,
      };
      const options = {
        expiresIn: "60m",
      };
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.status(200).json({
        success: true,
        message: `Email and Password are correct`,
        token: token,
      });
    }
  });
};

module.exports = login;
