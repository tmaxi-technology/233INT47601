var ProductType = require("../infra/models/productType");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/productTypeMysql");
var { convertToSlug } = require("../utils/format_data");

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
    var productType = new ProductType(body);
    await mysql.create(productType);
    return res.status(200).json({
      sucess: true,
      mes: "create productType success",
      productType,
    });
  } catch (error) {
    console.log("err create productType api" + error);
  }
});

const getProductType = asyncHandler(async (req, res) => {
  let queryParams = req.query;
  try {
    let whereParams = [];
    let options = {
      limit: queryParams.limit ? queryParams.limit : 10,
      offset: queryParams.offset ? queryParams.offset : 0,
      orderBy: queryParams.orderBy ? queryParams.orderBy : null,
    };
    if (queryParams) {
      // var filter = {};
      // for (var key in queryParams) {
      //   var value = queryParams[key];
      //   filter[key] = value;
      // }
      for (let key in queryParams) {
        if (key !== "limit" && key !== "offset" && key !== "orderBy") {
          whereParams.push({
            field: key,
            condition: "= ?",
            value: queryParams[key],
          });
        }
      }
      // console.log("whereParams: ", whereParams);
    }
    var results = await mysql.getproductType(whereParams, options);
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get productType error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

const getProductTypeById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    let result = await mysql.getProductTypeById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "productType not found",
    });
  } catch (error) {
    console.log("get productType by id error = " + error);
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
    var productType = await mysql.getProductTypeById(id);
    if (!productType) {
      return res.status(404).json({
        sucess: false,
        mes: "product type not found",
      });
    }
    if (data.name) {
      productType.name = data.name;
      productType.slug = convertToSlug(data.name);
    }
    if (data.image) {
      productType.image = data.image;
    }
    if (data.category_id) {
      productType.category_id = data.category_id;
    }
    await mysql.update(productType, id);
    return res.status(200).json({
      sucess: true,
      mes: "update productType success",
      productType,
    });
  } catch (error) {
    console.log("err update productType" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const deleteProductType = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteProductType(req.params.id);
    return res.status(200).json({
      sucess: true,
      mes: "delete productType success",
    });
  } catch (error) {
    console.log("err delete productType" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

module.exports = {
  create: create,
  getProductType: getProductType,
  getProductTypeById: getProductTypeById,
  update: update,
  deleteProductType: deleteProductType,
};
