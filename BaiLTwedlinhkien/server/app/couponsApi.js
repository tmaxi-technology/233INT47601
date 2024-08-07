var Coupons = require("../infra/models/coupons");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/couponsMysql");
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
    var coupons = new Coupons(body);
    await mysql.create(coupons);
    return res.status(200).json({
      sucess: true,
      mes: "create coupons success",
      coupons,
    });
  } catch (error) {
    console.log("err create coupons api" + error);
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
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get coupons error = " + err);
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
      mes: "coupons not found",
    });
  } catch (error) {
    console.log("get coupons by id error = " + error);
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
    var coupons = await mysql.getById(id);
    if (!coupons) {
      return res.status(404).json({
        sucess: false,
        mes: "coupons not found",
      });
    }
    if (data.name) {
      coupons.name = data.name;
    }
    if (data.description) {
      coupons.description = data.description;
    }
    if (data.percent) {
      coupons.percent = data.percent;
    }

    await mysql.update(coupons, id);
    return res.status(200).json({
      sucess: true,
      mes: "update coupons success",
      coupons,
    });
  } catch (error) {
    console.log("err update coupons" + error);
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
      mes: "delete coupons success",
    });
  } catch (error) {
    console.log("err delete coupons" + error);
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
};
