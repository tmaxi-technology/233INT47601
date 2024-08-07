var express = require("express");
var router = express.Router();
var ctrls = require("../app/cartsApi");

router.get("/carts/:id", ctrls.getByIdUser);

router.post("/carts", ctrls.create);

// router.put("/receipt/:id", ctrls.update);

// router.get("/carts", ctrls.getAll);

router.delete("/carts/:id", ctrls.deleteById);

router.post("/carts/delete/product", ctrls.deleteProduct);

module.exports = router;
