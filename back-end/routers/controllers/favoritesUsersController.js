const connection = require("../../db/db");

const addFavoriteUser = (req, res) => {
  const { favUser } = req.params;
  const { userId } = req.token;
  const data = [userId, favUser];
  const query = `INSERT INTO favoritesUsers(user_id, fav_user_id) VALUES(?,?)`;
  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err.message);

      res.status(404).json({ massage: err });
    }
    res.status(201).json({ result: result });
  });
};
const removeFavoriteUser = (req, res) => {
  const { favUser } = req.params;
  const { userId } = req.token;
  const data = [userId, favUser];
  const query = `DELETE favoritesUsers WHERE user_id=? AND fav_user_id=?`;
  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err.message);

      res.status(404).json({ massage: err });
    }
    res.status(201).json({ result: result });
  });
};

const getFavoriteUsers = (req, res) => {
  const { userId } = req.token;
  const query = `SELECT fav_user_id FROM favoritesUsers WHERE user_id=${userId}`;
  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err.message);

      res.status(404).json({ massage: err });
    }
    res.status(200).json({
      success: true,
      message: `all favorite Users for the user with id ${userId}`,
      users: result,
    });
  });
};

module.exports = { addFavoriteUser, removeFavoriteUser, getFavoriteUsers };
