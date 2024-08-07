var express = require("express");
var router = express.Router();
var ctrls = require("../app/paymentsApi");

router.get("/pays/:id", ctrls.getById);

router.put("/pays/:id", ctrls.update);

router.get("/pays", ctrls.getAll);

router.post("/pays", ctrls.create);

router.delete("/pays/:id", ctrls.deleteById);


module.exports = router;