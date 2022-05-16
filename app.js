const express = require("express");
const app = express();
const PORT = 8000;
const mysql = require("mysql");
const MySQLEvents = require("@rodrigogs/mysql-events");
var cors = require("cors");
app.use(express.json({ limit: "10MB" }));
app.use(cors());

const { db, config } = require("./Helpers/db/db");

app.get("/request", async (req, res) => {
  const userId = req.query.id;
  db.query(
    `UPDATE ${config.tableName} SET payment_status = ? WHERE id = ?`,
    ["pending", userId],
    (error, results, fields) => {
      if (error) throw error;

      if (results.affectedRows > 0) {
        res.json({
          status: "success",
          message: "status changed to pending",
        });
      }
    }
  );
});
app.get("/payment-statuts", async (req, res) => {
  console.log("payment request");

  // const instance = require("./Helpers/instance/instances");
  const instance = new MySQLEvents(db, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();
  instance.addTrigger({
    name: "Trigger on payment status column change", // event name
    expression: `${config.dbName}.${config.tableName}.*`, // db.table.column
    statement: MySQLEvents.STATEMENTS.UPDATE, // update, delete, select, insert
    onEvent: async (event) => {
      // You will receive the events here
      console.log("Event stopped");
      console.log(event);
      await instance.stop();
      res.json({
        status: "approved",
        message: "payment successfully paid",
      });
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
});
app.get("/cancle-request", async (req, res) => {
  // const instance = require("./Helpers/instance/instances");
  const instance = new MySQLEvents(db, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();
  instance.removeTrigger({
    name: "Trigger on payment status column change", // event name
    expression: `${config.dbName}.${config.tableName}.*`, // db.table.column
    statement: MySQLEvents.STATEMENTS.UPDATE, // update, delete, select, insert
  });
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  res.send("request cancled");
});
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
