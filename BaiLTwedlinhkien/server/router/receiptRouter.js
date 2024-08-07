var express = require("express");
var router = express.Router();
var ctrls = require("../app/receiptApi");

router.get("/receipts/:id", ctrls.getById);

router.get("/filterBill", ctrls.search);

// router.put("/receipt/:id", ctrls.update);

router.get("/receipts", ctrls.getAll);

router.post("/receipts", ctrls.create);

router.delete("/receipt/:id", ctrls.deleteById);


module.exports = router;