var express = require("express");
var router = express.Router();
var ctrls = require("../app/colorSizeApi");

router.get("/color/:id", ctrls.getById);

router.put("/color/:id", ctrls.update);

router.get("/color", ctrls.getAll);

router.post("/color", ctrls.create);

router.delete("/color/:id", ctrls.deleteById);


module.exports = router;