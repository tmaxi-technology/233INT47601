var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var helmet = require("helmet");

require("dotenv").config();

const app = express();
var router = express.Router();
const PORT = process.env.PORT || 1400;

var userRouter = require("./router/usersRouter");
var productRouter = require("./router/productsRouter");
var payRouter = require("./router/paymentsRouter");
var color = require("./router/colorSizeRouter");
var couponsRouter = require("./router/couponsRouter");
var providerRouter = require("./router/providersRouter");
var cateRouter = require("./router/categoriesRouter");
var typeRouter = require("./router/productTypeRouter");
var cartsRouter = require("./router/carts");
var receiptRouter = require("./router/receiptRouter");
var receiptDetailRouter = require("./router/receiptDetailRouter");
var UploadCloud = require("./router/uploadCloudRouter");

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

router.use(UploadCloud);

router.use(userRouter);
router.use(productRouter);
router.use(color);
router.use(payRouter);
router.use(couponsRouter);
router.use(providerRouter);
router.use(cateRouter);
router.use(typeRouter);
router.use(cartsRouter);
router.use(receiptRouter);
router.use(receiptDetailRouter);
app.use(router);

// 404
app.use(function (req, res, next) {
  return res.status(404).send({ message: req.url + " Not found." });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.status(500).send({ error: err });
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
