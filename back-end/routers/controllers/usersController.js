const connection = require("../../db/db");
const bcrypt = require("bcrypt");
require("dotenv");
//Add Users
const addUser = async (req, res) => {
  const { user_name, phone, email, password, payment_ref, role_id } = req.body;
  const hashPassword = await bcrypt.hash(password, process.env.SALT||10);
  const data = [user_name, phone, email, hashPassword, payment_ref, role_id];
  const query =
    "INSERT INTO users(user_name, phone, email, password, payment_ref, role_id) VALUES(?,?,?,?,?,?)";
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    res.status(201).json({ result: result });
  });
};
module.exports = addUser;
