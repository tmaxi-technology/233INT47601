var Product = require("../infra/models/product");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/productsMysql");
var { convertToSlug, randomNumber } = require("../utils/format_data");

const create = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    if (!body.name) {
      return res.status(404).json({
        sucess: false,
        mes: "missing inputs",
      });
    }
    var slug = convertToSlug(body.name);
    body.slug = slug;
    body.code = "TNSP" + randomNumber();
    var product = new Product(body);
    await mysql.create(product);
    return res.status(200).json({
      sucess: true,
      mes: "create product success",
      product,
    });
  } catch (error) {
    console.log("err create product api " + error);
  }
});

const getAll = asyncHandler(async (req, res) => {
  let queryParams = req.query;
  try {
    let whereParams = [];
    let options = {
      limit: queryParams.limit ? queryParams.limit : 10,
      offset: queryParams.offset ? queryParams.offset : 0,
      orderBy: queryParams.orderBy ? queryParams.orderBy : "created_date DESC",
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
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get product error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

const getById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    let result = await mysql.getdetailById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "product not found",
    });
  } catch (error) {
    console.log("get product by id error = " + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const getBySlug = asyncHandler(async (req, res) => {
  var id = req.params.id;
  try {
    let result = await mysql.getById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "product not found",
    });
  } catch (error) {
    console.log("get product by slug error = " + error);
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
    var product = await mysql.getdetailById(id);
    if (!product) {
      return res.status(404).json({
        sucess: false,
        mes: "product not found",
      });
    }
    if (data.name) {
      product.name = data.name;
      product.slug = convertToSlug(data.name);
    }
    if (data.description) {
      product.description = data.description;
    }
    if (data.price) {
      product.price = data.price;
    }
    product.amount = data.amount;
    product.coupon_id = data.coupon_id;

    if (data.quantity) {
      product.quantity = data.quantity;
    }
    if (data.image) {
      product.image = data.image;
    }
    if (data.status) {
      product.status = data.status;
    }
    if (data.bestseller) {
      product.bestseller = data.bestseller;
    }
    if (data.display) {
      product.display = data.display;
    }
    if (data.product_type_id) {
      product.product_type_id = data.product_type_id;
    }
    if (data.category_id) {
      product.category_id = data.category_id;
    }
    if (data.provider_id) {
      product.provider_id = data.provider_id;
    }
    await mysql.update(product, id);
    return res.status(200).json({
      sucess: true,
      mes: "update product success",
      product,
    });
  } catch (error) {
    console.log("err update product " + error);
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

const search = asyncHandler(async (req, res) => {
  const fildter = req.query.fildter;
  const value = req.query.value;
  try {
    let result = await mysql.search(fildter, value);
    return res.status(200).json({
      sucess: true,
      result,
    });
  } catch (err) {
    console.log("get product error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  update: update,
  deleteById: deleteById,
  getBySlug: getBySlug,
  search: search,
};
