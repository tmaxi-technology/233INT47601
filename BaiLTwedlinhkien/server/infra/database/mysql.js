var mysql = require("mysql2");

var connectionPool = mysql.createPool({
	host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
});
console.log('successfully connected to database sportZone', process.env.DATABASE_NAME);

connectionPool.on("connection", function (connection) {
	connection.on("error", function (err) {
    console.log("Mysql error" + err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		}
	});
	connection.on("close", function (err) {
    console.log('Mysql close url', err);
	});
});

function handleDisconnect() {
	connectionPool = mysql.createPool({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASS,
		database: process.env.DATABASE_NAME
	});
	connectionPool.on("connection", function (connection) {
		console.log("DB handleDisconnect established url = ");

		connection.on("error", function (err) {
			console.log(	"Mysql handleDisconnect error url = ", err);
		});

		connection.on("close", function (err) {
			console.log("Mysql handleDisconnect close url = ", err );
		});
	});
}

function getConnection() {
	return connectionPool;
}

module.exports = {
	// testQuery: testQuery,
	getConnection: getConnection,
};