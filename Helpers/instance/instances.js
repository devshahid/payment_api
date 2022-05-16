const db = require("../db/db");
const MySQLEvents = require("@rodrigogs/mysql-events");
const instanceConnection = async () => {
  const instance = new MySQLEvents(db, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();
};
module.exports = instanceConnection;
