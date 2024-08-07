var mysqlConnection = require("./mysql").getConnection();
const promisePool = mysqlConnection.promise();

async function getAll(whereParams, options) {
  const promisePool = mysqlConnection.promise();
  let mysqlQuery = "SELECT * FROM color_size";
  let mysqlQueryCount = "select count(id) as num_rows from color_size";
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

async function getById(id) {
  var [results] = await promisePool.query(
    "SELECT * FROM color_size WHERE id = ?",
    [id]
  );
  return results[0];
}

async function create(data) {
  var [results] = await promisePool.query(
    "INSERT INTO color_size SET created_date = NOW() , ?;",
    data
  );
  return results;
}

async function update(data, id) {
  var mysql = mysqlConnection.format(
    " " +
      " UPDATE " +
      " color_size SET ? ," +
      " updated_date = NOW() " +
      " WHERE id = ? ;",
    [data, id]
  );
  var [results] = await promisePool.query(mysql);
  return results;
}

async function deleteById(id) {
  return await promisePool.query("DELETE FROM color_size WHERE id = ?", [id]);
}

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  update: update,
  deleteById: deleteById,
};
