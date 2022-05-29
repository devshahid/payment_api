const mysql = require("mysql");
const config = {
  tableName: "crypto_payments",
  addressTable: "addressess",
  dbName: "mgautoma_remotedb",
  dbhost: "148.72.168.185",
  dbuser: "mgautoma",
  dbpassword: "mgpass@2017",
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
