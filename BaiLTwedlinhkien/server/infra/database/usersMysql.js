var mysqlConnection = require("./mysql").getConnection();
const promisePool = mysqlConnection.promise();

async function getUsers(whereParams, options) {
  const promisePool = mysqlConnection.promise();

  let mysqlQuery = "SELECT * FROM users";
  let mysqlQueryCount = "select count(id) as num_rows from users";
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

async function getUserById(id) {
  var [results] = await promisePool.query("SELECT * FROM users WHERE id = ?", [
    id,
  ]);
  return results[0];
}

async function login(data) {
  var [results] = await promisePool.query(
    "SELECT id, username, email, phone, password, role FROM users Where email = ? OR username = ? ;",
    [data, data]
  );
  return results[0];
}
async function checkUser({ email, phone }) {
  var [result] = await promisePool.query(
    "SELECT id, email,phone, username FROM users Where phone = ? OR email = ? ;",
    [phone, email]
  );
  return result[0];
}

// async function checkForgotPasswordUser(data) {
//   var [results] = await promisePool.query(
//     "SELECT _id, phone, email, fullname FROM users Where email = ? OR phone = ?",
//     [data, data]
//   );
//   return results[0];
// }

// async function checkForgotPasswordUser(data) {
//   var [results] = await promisePool.query(
//     "SELECT _id, phone, email, fullname FROM users Where email = ? OR phone = ?",
//     [data, data]
//   );
//   return results[0];
// }

// async function checkUser(email, phone) {
//   var [result] = await promisePool.query(
//     "SELECT _id, email, phone FROM users Where email = ? OR phone = ?;",
//     [email, phone]
//   );
//   return result;
// }

async function register(data) {
  var [results] = await promisePool.query(
    "INSERT INTO users SET created_date = NOW() , ?;",
    data
  );
  return results;
}

async function updateUser(data, id) {
  var mysql = mysqlConnection.format(
    " " +
      " UPDATE " +
      " users SET ? ," +
      " updated_date = NOW() " +
      " WHERE id = ? ;",
    [data, id]
  );
  var [results] = await promisePool.query(mysql);
  return results;
}

async function deleteUser(id) {
  return await promisePool.query("DELETE FROM users WHERE id = ?", [id]);
}

async function search(fildter, value) {
  var results = await promisePool.query(
    `SELECT * FROM users WHERE ` + fildter + ` like "%${value}%" ;`
  );
  return results[0];
}

// async function searchUser(fildter, value) {
//   var results = await promisePool.query(
//     `SELECT fullname, address, phone,email,password, sex, avatar FROM users WHERE ` +
//       fildter +
//       ` like "%${value}%" ;`
//   );
//   return results[0];
// }

// async function countUsers(rs) {
//   var [results] = await promisePool.query(
//     "SELECT COUNT(*) as countUser FROM users;"
//   );
//   return results[0].countUser;
// }

module.exports = {
  getUsers: getUsers,
  login: login,
  register: register,
  checkUser: checkUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
  search: search
  // searchUser: searchUser,
  // countUsers: countUsers,
  // checkForgotPasswordUser,
};
