var express = require("express");
var router = express.Router();
var ctrls = require("../app/providerApi");

router.get("/provider/:id", ctrls.getProviderById);

router.put("/provider/:id", ctrls.update);

router.get("/provider", ctrls.getProviders);

router.post("/provider", ctrls.create);

router.delete("/provider/:id", ctrls.deleteProvider);


module.exports = router;