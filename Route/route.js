const express = require("express");
const router = express.Router();

const controllers = require("../Controllers/handleController");

router.get("/insertdetails", controllers.insertDetails);
router.get("/payment-status", controllers.paymentStatus);
router.get("/cancle-request", controllers.cancleRequest);
router.post("/update-status", controllers.updateStatus);
router.post("/getbalance", controllers.getbalance);
router.post("/create-add", controllers.createAdd);
router.get("/create-add", controllers.createAdd);

module.exports = router;
