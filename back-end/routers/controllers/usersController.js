const connection = require("../../db/db");
const bcrypt = require("bcrypt");
//Add Users
const addUser = async (req, res) => {
  console.log(process.env.SALT);

  const { user_name, phone, email, password, payment_ref } = req.body;
  const hashPassword = await bcrypt.hash(
    password,
    Number.parseInt(process.env.SALT)
  );
  const role_id = 5;
  const data = [user_name, phone, email, hashPassword, payment_ref, role_id];
  const query =
    "INSERT INTO users(user_name, phone, email, password, payment_ref, role_id) VALUES(?,?,?,?,?,?)";
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    res.status(201).json({
      success: true,
      massage: "SUCSESS ADD NEW USER",
      newUserId: result.insertId,
    });
  });
};

const getAllUsers = async (req, res) => {
  const query = "SELECT * FROM  users";
  connection.query(query, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    res.status(201).json({ Users: result });
  });
};
module.exports = { addUser, getAllUsers };
