const mysql = require("mysql");
const config = {
  tableName: "crypto_payments",
  addressTable: "addressess",
  dbName: "payment_api",
  dbhost: "localhost",
  dbuser: "root",
  dbpassword: "",
};

var db = mysql.createConnection({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbName,
});
db.connect((error) => {
  if (error) throw error;
  console.log("db connected");
});

module.exports = { db, config };
