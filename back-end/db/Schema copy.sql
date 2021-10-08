

Use sql6442860;

CREATE TABLE IF NOT EXISTS  favoritesUsers (
user_id INT NOT NULL,
fav_user_id INT NOT NULL,
FOREIGN KEY (fav_user_id) REFERENCES users(user_id),
FOREIGN KEY (user_id) REFERENCES users(user_id),
PRIMARY KEY (user_id,fav_user_id)
);





