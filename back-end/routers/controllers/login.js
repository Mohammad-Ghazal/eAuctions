const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../../db/db");
require("dotenv").config();

//create login user
const login = (res, req) => {
  const email = req.body.email.toLowerCase();
  console.log(email);
  const password = req.body.password;
  const data = [email];
  const getUser = `SELECT * FROM users where email =?`;
  connection.query(getUser, data, (err, result) => {
    if (!result) {
      res
        .status(404)
        .json({ success: false, message: `The email doesn't exist ` });
    } else {
      const valid = bcrypt.compare(password, result.password);
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
      console.log(payload);
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
