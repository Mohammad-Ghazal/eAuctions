const connection = require("../../db/db");
console.log(connection);
//Add roles
const newRole = (req, res) => {
  const { permission } = req.body;
  const insert = `INSERT INTO roles (permission) VALUES (?)`;
  const data = [permission];
  connection.query(insert, data, (err, result) => {
    if (err) {
      res.status(404).json({ massage: err });
    }
    if (result) {
      res.status(201).json({ result: result });
    }
  });
};

module.exports = newRole;
