var express = require("express");
var router = express.Router();
var ctrls = require("../app/usersApi");

router.get("/users/search", ctrls.search);

router.get("/users/:id", ctrls.getUserById);

router.put("/users/:id", ctrls.updateUser);

router.get("/users", ctrls.getUsers);

router.post("/register", ctrls.register);

router.post("/login", ctrls.login);

router.delete("/users/:id", ctrls.deleteUser);

module.exports = router;

// router.post("/forgot-password", (req, res) => {
//   userAPI
//     .forgotPassword(req)
//     .then(function (rs) {
//       res.json(rs);
//     })
//     .catch(function (reason) {
//       res.status(500).json(reason);
//     });
// });

// router.patch("/reset-password/:resetCode", (req, res) => {
//   userAPI
//     .resetPassword(req)
//     .then(function (rs) {
//       res.json(rs);
//     })
//     .catch(function (reason) {
//       res.status(500).json(reason);
//     });
// });
