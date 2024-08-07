var express = require("express");
var router = express.Router();
var ctrls = require("../app/couponsApi");

router.get("/coupons/:id", ctrls.getById);

router.put("/coupons/:id", ctrls.update);

router.get("/coupons", ctrls.getAll);

router.post("/coupons", ctrls.create);

router.delete("/coupons/:id", ctrls.deleteById);


module.exports = router;