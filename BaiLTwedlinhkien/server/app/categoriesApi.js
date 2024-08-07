var Cate = require("../infra/models/categories");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/categoriesMysql");
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
    var category = new Cate(body);
    await mysql.create(category);
    return res.status(200).json({
      sucess: true,
      mes: "create category success",
      category,
    });
  } catch (error) {
    console.log("err create category api" + error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
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
    var results = await mysql.getCategories(whereParams, options);
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get category error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

const getcateById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    let result = await mysql.getcateById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "category not found",
    });
  } catch (error) {
    console.log("get category by id error = " + error);
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
    var cate = await mysql.getcateById(id);
    if (!cate) {
      return res.status(404).json({
        sucess: false,
        mes: "category not found",
      });
    }
    if (data.name) {
      cate.name = data.name;
      cate.slug = convertToSlug(data.name);
    }
    if (data.image) {
      cate.image = data.image;
    }
    await mysql.update(cate, id);
    return res.status(200).json({
      sucess: true,
      mes: "update category success",
      cate,
    });
  } catch (error) {
    console.log("err update category" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const deleteCate = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteCate(req.params.id);
    return res.status(200).json({
      sucess: true,
      mes: "delete category success",
    });
  } catch (error) {
    console.log("err delete category" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

module.exports = {
  create: create,
  getCategories: getCategories,
  getcateById: getcateById,
  update: update,
  deleteCate: deleteCate,
};
