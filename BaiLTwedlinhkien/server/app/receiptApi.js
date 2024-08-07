var Receipt = require("../infra/models/receipt");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/receiptMysql");
var { convertToSlug } = require("../utils/format_data");

const create = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    var receipt = new Receipt(body);
    await mysql.create(receipt);
    return res.status(200).json({
      sucess: true,
      mes: "create receipt success",
      receipt,
    });
  } catch (error) {
    console.log("err create receipt api" + error);
  }
});

const getAll = asyncHandler(async (req, res) => {
  let queryParams = req.query;
  try {
    let whereParams = [];
    let options = {
      limit: queryParams.limit ? queryParams.limit : 10,
      offset: queryParams.offset ? queryParams.offset : 0,
      orderBy: queryParams.orderBy ? queryParams.orderBy : "receipt.id DESC",
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
    console.log("get payment error = " + err);
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
      mes: "receipt not found",
    });
  } catch (error) {
    console.log("get receipt by id error = " + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

// const update = asyncHandler(async (req, res) => {
//   let data = req.body;
//   let id = req.params.id;
//   try {
//     var payment = await mysql.getById(id);
//     if (!payment) {
//       return res.status(404).json({
//         sucess: false,
//         mes: "payment not found",
//       });
//     }
//     if (data.pays) {
//       payment.pays = data.pays;
//     }
//     if (data.code) {
//       payment.code = data.code;
//     }
//     if (data.description) {
//       payment.description = data.description;
//     }
//     if (data.display) {
//       payment.display = data.display;
//     }

//     await mysql.update(payment, id);
//     return res.status(200).json({
//       sucess: true,
//       mes: "update payment success",
//       payment,
//     });
//   } catch (error) {
//     console.log("err update payment" + error);
//     return res.status(400).json({
//       sucess: false,
//       mes: error.message,
//     });
//   }
// });

const deleteById = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteById(req.params.id);
    return res.status(200).json({
      sucess: true,
      mes: "delete receipt success",
    });
  } catch (error) {
    console.log("err delete receipt" + error);
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
    console.log("get user error = " + err);
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
  // update: update,
  deleteById: deleteById,
  search: search,
};
