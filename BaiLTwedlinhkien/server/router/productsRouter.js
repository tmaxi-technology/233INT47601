var express = require("express");
var router = express.Router();
var ctrls = require("../app/productsApi");

router.get("/product/:id", ctrls.getById);

router.get("/product/slug/:id", ctrls.getBySlug);

router.put("/product/:id", ctrls.update);

router.get("/product", ctrls.getAll);

router.post("/product", ctrls.create);

router.delete("/product/:id", ctrls.deleteById);

router.get("/search", ctrls.search);


module.exports = router;
