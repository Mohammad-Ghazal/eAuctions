const mysql = require("mysql2");
require("dotenv").config({ path: "../../back-end/" });
console.log(process.env.PORT);

/*const connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,
}); */

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6442860",
  password: "2EcMreuNYR",
  database: "sql6442860",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id: " + connection.threadId);
});

module.exports=connection;