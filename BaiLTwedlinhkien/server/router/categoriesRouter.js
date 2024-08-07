var express = require("express");
var router = express.Router();
var ctrls = require("../app/categoriesApi");

router.get("/cate/:id", ctrls.getcateById);

router.put("/cate/:id", ctrls.update);

router.get("/cate", ctrls.getCategories);

router.post("/cate", ctrls.create);

router.delete("/cate/:id", ctrls.deleteCate);


module.exports = router;