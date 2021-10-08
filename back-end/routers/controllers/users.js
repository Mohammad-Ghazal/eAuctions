const connection = require("../../db/db");
const bcrypt = require("bcrypt");
//Add Users
const addUser = async (req, res) => {
  const { user_name, phone, email, password, payment_ref, role_id } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const data = [user_name, phone, email, hashPassword, payment_ref, role_id];
  const insertAddUser =
    "INSERT INTO users(user_name, phone, email, password, payment_ref, role_id) VALUES(?,?,?,?,?,?)";
  connection.query(insertAddUser, data, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    res.status(201).json({ result: result });
  });
};
module.exports = addUser;
