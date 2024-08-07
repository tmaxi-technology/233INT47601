var ReceiptDetail = require("../infra/models/detailsReceipt");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/receiptDetailMysql");
var { convertToSlug } = require("../utils/format_data");

const create = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    var receiptDetail = new ReceiptDetail(body);
    await mysql.create(receiptDetail);
    return res.status(200).json({
      sucess: true,
      mes: "create receiptDetail success",
      receiptDetail,
    });
  } catch (error) {
    console.log("err create receiptDetail api" + error);
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
    console.log("get receiptDetail error = " + err);
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
      mes: "receiptDetail not found",
    });
  } catch (error) {
    console.log("get receiptDetail by id error = " + error);
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
    var receiptDetail = await mysql.getById(id);
    if (!receiptDetail) {
      return res.status(404).json({
        sucess: false,
        mes: "receiptDetail not found",
      });
    }
    if (data.pays) {
      receiptDetail.pays = data.pays;
    }
    if (data.code) {
      receiptDetail.code = data.code;
    }
    if (data.description) {
      receiptDetail.description = data.description;
    }
    if (data.display) {
      receiptDetail.display = data.display;
    }

    await mysql.update(receiptDetail, id);
    return res.status(200).json({
      sucess: true,
      mes: "update receiptDetail success",
      receiptDetail,
    });
  } catch (error) {
    console.log("err update receiptDetail" + error);
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
      mes: "delete receiptDetail success",
    });
  } catch (error) {
    console.log("err delete receiptDetail" + error);
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
