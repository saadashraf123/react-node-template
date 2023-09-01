require("dotenv").config();
const mysql = require("mysql2");
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
});
connection.connect((err) => {
  if (err) {
    console.log("Error in Connecting Mysql DB" + JSON.stringify(err));
  } else {
    console.log("DB connected Successfully");
  }
});

module.exports = connection;
