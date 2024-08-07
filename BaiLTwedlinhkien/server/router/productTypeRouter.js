var express = require("express");
var router = express.Router();
var ctrls = require("../app/productTypeApi");

router.get("/type/:id", ctrls.getProductTypeById);

router.put("/type/:id", ctrls.update);

router.get("/type", ctrls.getProductType);

router.post("/type", ctrls.create);

router.delete("/type/:id", ctrls.deleteProductType);


module.exports = router;