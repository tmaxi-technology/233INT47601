var Provider = require("../infra/models/provider");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/providersMysql");
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
    var provider = new Provider(body);
    await mysql.create(provider);
    return res.status(200).json({
      sucess: true,
      mes: "create provider success",
      provider,
    });
  } catch (error) {
    console.log("err create provider api" + error);
  }
});

const getProviders = asyncHandler(async (req, res) => {
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
    var results = await mysql.getProvider(whereParams, options);
    return res.status(200).json({
      sucess: true,
      results,
    });
  } catch (err) {
    console.log("get provider error = " + err);
    return res.status(400).json({
      sucess: false,
      mes: err.message,
    });
  }
});

const getProviderById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    let result = await mysql.getProviderById(id);
    if (result) {
      return res.status(200).json({
        sucess: true,
        result,
      });
    }
    return res.status(404).json({
      sucess: false,
      mes: "provider not found",
    });
  } catch (error) {
    console.log("get provider by id error = " + error);
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
    var provider = await mysql.getProviderById(id);
    if (!provider) {
      return res.status(404).json({
        sucess: false,
        mes: "provider not found",
      });
    }
    if (data.name) {
      provider.name = data.name;
      provider.slug = convertToSlug(data.name);
    }
    if (data.phone) {
      provider.phone = data.phone;
    }
    if (data.email) {
      provider.email = data.email;
    }
    if (data.image) {
      provider.image = data.image;
    }
    if (data.quantity) {
      provider.quantity = data.quantity;
    }

    await mysql.update(provider, id);
    return res.status(200).json({
      sucess: true,
      mes: "update provider success",
      provider,
    });
  } catch (error) {
    console.log("err update provider" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

const deleteProvider = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteProvider(req.params.id);
    return res.status(200).json({
      sucess: true,
      mes: "delete provider success",
    });
  } catch (error) {
    console.log("err delete provider" + error);
    return res.status(400).json({
      sucess: false,
      mes: error.message,
    });
  }
});

module.exports = {
  create: create,
  getProviders: getProviders,
  getProviderById: getProviderById,
  update: update,
  deleteProvider: deleteProvider,
};
