var mysqlConnection = require("./mysql").getConnection();
const promisePool = mysqlConnection.promise();

async function getAll(whereParams, options) {
  const promisePool = mysqlConnection.promise();
  let mysqlQuery = "SELECT * FROM carts";
  let params = [];

  if (whereParams.length > 0) {
    mysqlQuery += " where ";
    for (let key in whereParams) {
      if (key !== "0") {
        mysqlQuery += " and ";
      }
      mysqlQuery += whereParams[key].field + " " + whereParams[key].condition;
      params.push(whereParams[key].value);
    }
  }
  if (options.orderBy) {
    mysqlQuery += " ORDER BY " + options.orderBy;
  }

  mysqlQuery += " limit " + options.offset + ", " + options.limit + ";";
  let [results] = await promisePool.query(mysqlQuery, params);
  return {
    list: results,
  };
}

async function getById(id) {
  var [results] = await promisePool.query("SELECT * FROM carts WHERE id = ?", [
    id,
  ]);
  return results[0];
}

async function create(data) {
  var [results] = await promisePool.query(
    "INSERT INTO carts SET created_date = NOW() , ?;",
    data
  );
  return results;
}

async function update(data, id) {
  var mysql = mysqlConnection.format(
    " " +
      " UPDATE " +
      " carts SET ? ," +
      " updated_date = NOW() " +
      " WHERE id = ? ;",
    [data, id]
  );
  var [results] = await promisePool.query(mysql);
  return results;
}

async function deleteById(id) {
  return await promisePool.query("DELETE FROM carts WHERE user_id = ?", [id]);
}

async function deleteProduct(pid, uid) {
  return await promisePool.query(
    "DELETE FROM carts WHERE product_id = ? and user_id = ?",
    [pid, uid]
  );
}

async function getByIdUser(id) {
  const query =
    "SELECT p.id, p.name,p.price, p.image , p.amount, c.quantity, c.price as totalprice " +
    "FROM carts c " +
    "LEFT JOIN users u ON c.user_id = u.id " +
    "LEFT JOIN products p ON c.product_id = p.id " +
    "WHERE c.user_id = ?;";
  var results = await promisePool.query(query, [id]);
  var data = results[0];
  let totalPrice = 0;
  data.forEach((row) => {
    totalPrice += parseInt(row.totalprice);
  });
  return { list: data, total: totalPrice };
}

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  update: update,
  deleteById: deleteById,
  getByIdUser: getByIdUser,
  deleteProduct: deleteProduct,
};
