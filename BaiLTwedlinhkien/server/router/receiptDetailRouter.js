var express = require("express");
var router = express.Router();
var ctrls = require("../app/receiptDetailApi");

router.get("/receipt_details/:id", ctrls.getById);

// router.put("/receipt/:id", ctrls.update);

router.get("/receipt_details", ctrls.getAll);

router.post("/receipt_details", ctrls.create);

// router.delete("/receipt/:id", ctrls.deleteById);


module.exports = router;