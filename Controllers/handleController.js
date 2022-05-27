const Web3EthAccounts = require("web3-eth-accounts");
const web3_eth = require("web3-eth");
const crypto = require("crypto");
const mysql = require("mysql");
const MySQLEvents = require("@rodrigogs/mysql-events");
const { db, config } = require("../Helpers/db/db");

class HandleController {
  async insertDetails(req, res) {
    const account = new Web3EthAccounts(process.env.infraurl);
    const accounts = account.create();
    const paymentID = crypto.randomBytes(8).toString("hex");
    const txID = crypto.randomBytes(10).toString("hex");
    const { orderID, amountUSD, coinLabel, callbackurl, redirecturl } =
      req.query;
    console.log(req.query);
    const USD_TO_KIRIN = 0.1;
    const amount = (USD_TO_KIRIN * amountUSD).toFixed(8);
    const insertData = {
      orderID,
      amountUSD,
      amount,
      coinLabel,
      paymentID,
      txID,
      payment_status: "pending",
      callbackurl,
      redirecturl,
    };
    const insertAddress = {
      addressKey: accounts.address,
      privateKey: accounts.privateKey,
    };
    console.log(insertData);
    db.query(
      `INSERT INTO ${config.tableName} SET ?`,
      insertData,
      (error, results, fields) => {
        if (error) throw error;
        db.query(
          `INSERT INTO ${config.addressTable} SET ?`,
          insertAddress,
          (error, results, fields) => {
            if (error) throw error;
          }
        );
        res.json({
          status: "success",
          message: "status changed to pending",
          address: accounts.address,
          paymentID,
          txID,
        });
      }
    );
  }
  async paymentStatus(req, res) {
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
  }
  async cancleRequest(req, res) {
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
  }
  async updateStatus(req, res) {
    const { txID, paymentID, payment_status, confirmationNumber } = req.body;
    db.query(
      `UPDATE ${config.tableName} SET payment_status = ?, confirmationNumber = ? WHERE paymentID = ? AND txID = ?`,
      [payment_status, confirmationNumber, paymentID, txID],
      (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows > 0) {
          res.json({
            status: "approved",
            message: "payment successfully paid",
          });
        }
      }
    );
  }
  async getbalance(req, res) {
    const web3Eth = new web3_eth(process.env.infraurl);

    const balance = await web3Eth.getBalance(
      "0x52ef021c521f70a91e605CcdbE1D47947BEc1627"
    );
    console.log(balance);
    res.send(balance);
  }
  async createAdd(req, res) {
    const account = new Web3EthAccounts(process.env.infraurl);
    const accounts = account.create();
    res.send(accounts);
    console.log(accounts);
  }
}
module.exports = new HandleController();
