var mysqlConnection = require("./mysql").getConnection();
const promisePool = mysqlConnection.promise();

async function getAll(whereParams, options) {
  const promisePool = mysqlConnection.promise();
  let mysqlQuery = "SELECT * FROM products";
  let mysqlQueryCount = "select count(id) as num_rows from products";
  let params = [];

  if (whereParams.length > 0) {
    mysqlQuery += " where ";
    mysqlQueryCount += " where ";
    for (let key in whereParams) {
      if (key !== "0") {
        mysqlQuery += " and ";
        mysqlQueryCount += " and ";
      }
      mysqlQuery += whereParams[key].field + " " + whereParams[key].condition;
      mysqlQueryCount +=
        whereParams[key].field + " " + whereParams[key].condition;
      params.push(whereParams[key].value);
    }
  }
  if (options.orderBy) {
    mysqlQuery += " ORDER BY " + options.orderBy;
  }

  mysqlQuery += " limit " + options.offset + ", " + options.limit + ";";
  let [numRows] = await promisePool.query(mysqlQueryCount, params);
  let [results] = await promisePool.query(mysqlQuery, params);

  return {
    list: results,
    total: numRows[0]["num_rows"],
    limit: options.limit,
    offset: options.offset,
  };
}

async function getById(slug) {
  var [results] = await promisePool.query(
    "SELECT * FROM products WHERE slug = ?",
    [slug]
  );
  const nameCode = results[0].code;
  var [list_size] = await promisePool.query(
    "SELECT cs.id as size_id, cs.name as color_size,pcs.product_code as name_code  FROM products as p INNER JOIN product_color_size as pcs ON p.code = pcs.product_code INNER JOIN color_size as cs ON cs.id = pcs.color_size_id"
  );
  return {
    list: results[0],
    list_size: list_size.filter((val) => val.name_code === nameCode),
  };
}

async function getdetailById(id) {
  var [results] = await promisePool.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return results[0];
}

async function create(data) {
  var [results] = await promisePool.query(
    "INSERT INTO products SET created_date = NOW() , ?;",
    data
  );
  return results;
}

async function update(data, id) {
  var mysql = mysqlConnection.format(
    " " +
      " UPDATE " +
      " products SET ? ," +
      " updated_date = NOW() " +
      " WHERE id = ? ;",
    [data, id]
  );
  var [results] = await promisePool.query(mysql);
  return results;
}

async function deleteById(id) {
  return await promisePool.query("DELETE FROM products WHERE id = ?", [id]);
}

async function search(fildter, value) {
  var results = await promisePool.query(
    `SELECT * FROM products WHERE ` + fildter + ` like "%${value}%" ;`
  );
  return results[0];
}

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  getdetailById: getdetailById,
  update: update,
  deleteById: deleteById,
  search: search,
};
