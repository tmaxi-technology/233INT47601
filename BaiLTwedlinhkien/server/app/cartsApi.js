var Cart = require("../infra/models/cart");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/cartsMysql");
var { convertToSlug } = require("../utils/format_data");

const create = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    var carts = new Cart(body);
    await mysql.create(carts);
    return res.status(200).json({
      sucess: true,
      mes: "add to cart success",
      carts,
    });
  } catch (error) {
    console.log("err create cart api" + error);
  }
});

const getAll = asyncHandler(async (req, res) => {
  let queryParams = req.query;
  try {
    let whereParams = [];
    let options = {
      limit: queryParams.limit ? queryParams.limit : 10,
      offset: queryParams.offset ? queryParams.offset : 0,
      orderBy: queryParams.orderBy ? queryParams.orderBy : null,
    };
    if (queryParams) {
      for (let key in queryParams) {
        if (key !== "limit" && key !== "offset" && key !== "orderBy") {
          whereParams.push({
            field: key,
            condition: "= ?",
            value: queryParams[key],
          });
        }
      }
    }
    var results = await mysql.getAll(whereParams, options);
    console.log("get all cart: ", results);
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get cart error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

const getById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    let result = await mysql.getById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "payment not found",
    });
  } catch (error) {
    console.log("get payment by id error = " + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const update = asyncHandler(async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  try {
    var payment = await mysql.getById(id);
    if (!payment) {
      return res.status(404).json({
        sucess: false,
        mes: "payment not found",
      });
    }
    if (data.pays) {
      payment.pays = data.pays;
    }
    if (data.code) {
      payment.code = data.code;
    }
    if (data.description) {
      payment.description = data.description;
    }
    if (data.display) {
      payment.display = data.display;
    }

    await mysql.update(payment, id);
    return res.status(200).json({
      sucess: true,
      mes: "update payment success",
      payment,
    });
  } catch (error) {
    console.log("err update payment" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const deleteById = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteById(req.params.id);
    return res.status(200).json({
      sucess: true,
      mes: "delete payment success",
    });
  } catch (error) {
    console.log("err delete payment" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const getByIdUser = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    let results = await mysql.getByIdUser(id);
    // console.log('results: ', results);
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (error) {
    console.log("get cart by id user error = " + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const uid = req.body.uid;
    const pid = req.body.pid;
    await mysql.deleteProduct(pid, uid);
    return res.status(200).json({
      sucess: true,
      mes: "delete product success",
    });
  } catch (error) {
    console.log("err delete product" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  update: update,
  deleteById: deleteById,
  getByIdUser: getByIdUser,
  deleteProduct: deleteProduct,
};
