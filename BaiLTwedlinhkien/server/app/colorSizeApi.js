var ColorSize = require("../infra/models/color_size");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/colorSizeMysql");
var { convertToSlug } = require("../utils/format_data");

const create = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    var color = new ColorSize(body);
    await mysql.create(color);
    return res.status(200).json({
      sucess: true,
      mes: "create color success",
      color,
    });
  } catch (error) {
    console.log("err create color api" + error);
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
    console.log("get color error = " + err);
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
      mes: "color not found",
    });
  } catch (error) {
    console.log("get color by id error = " + error);
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
    var color = await mysql.getById(id);
    if (!color) {
      return res.status(404).json({
        sucess: false,
        mes: "color not found",
      });
    }
    if (data.name) {
      color.name = data.name;
    }
    if (data.type) {
      color.type = data.type;
    }

    await mysql.update(color, id);
    return res.status(200).json({
      sucess: true,
      mes: "update color success",
      color,
    });
  } catch (error) {
    console.log("err update color" + error);
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
      mes: "delete color success",
    });
  } catch (error) {
    console.log("err delete color" + error);
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
