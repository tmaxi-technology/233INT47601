var { v4: uuidv4 } = require("uuid");
var Users = require("../infra/models/users");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const mailer = require("../mailer");
const asyncHandler = require("express-async-handler");
var mysql = require("../infra/database/usersMysql");
var ROLE = require("../utils/enums").ROLE;

const getUsers = asyncHandler(async (req, res) => {
  let queryParams = req.query;
  try {
    let whereParams = [];
    let options = {
      limit: queryParams.limit ? queryParams.limit : 10,
      offset: queryParams.offset ? queryParams.offset : 0,
      orderBy: queryParams.orderBy ? queryParams.orderBy : 'created_date DESC',
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
    var results = await mysql.getUsers(whereParams, options);
    return res.status(200).json({
      success: true,
      results,
    });
  } catch (err) {
    console.log("get users error = " + err);
    return res.status(400).json({
      success: false,
      mes: err.message,
    });
  }
});

const register = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    if (!body.email || !body.password || !body.username) {
      return res.status(200).json({
        success: false,
        mes: "missing inputs",
      });
    }
    // check user is exists
    var info = {
      email: body.email,
      phone: body.phone,
    };
    var user = await mysql.checkUser(info);
    // dòng này nếu user tồn tại là trả về có giá trị. Thì ss user.email với password hơi dư
    if (user) {
      if (user.email == body.email) {
        return res.status(200).json({
          success: false,
          mes: "email is exists",
        });
      }
      if (user.phone == body.phone) {
        return res.status(200).json({
          success: false,
          mes: "phone is exists",
        });
      }
    }
    if (!body.role) {
      body.role = ROLE.USER;
    }
    const hashingPassword = await bcrypt.hash(body.password, 10);
    body.password = hashingPassword;
    var user = new Users(body);
    await mysql.register(user);
    return res.status(200).json({
      success: true,
      mes: "create user success",
      user,
    });
  } catch (error) {
    console.log("err create user api" + error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if ((!email || !username) && !password) {
      return res.status(404).json({
        success: false,
        mes: "missing inputs",
      });
    }
    const userInforQuery = await mysql.login(email ? email : username);
    if (!userInforQuery) {
      return res.status(200).json({
        success: false,
        mes: "User not exists!",
      });
    }
    const passwordIsMatch = await bcrypt.compare(
      password,
      userInforQuery.password.toString()
    );
    if (passwordIsMatch) {
      return res.status(200).json({
        success: true,
        data: {
          id: userInforQuery.id,
          username: userInforQuery.username,
          email: userInforQuery.email,
          phone: userInforQuery.phone,
          role: userInforQuery.role,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        mes: "Wrong password!",
      });
    }
  } catch (err) {
    console.log("login users error = " + err);
    return res.status(400).json({
      success: false,
      mes: err.message,
    });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    var id = req.params.id;
    // console.log("id = " + id);
    let result = await mysql.getUserById(id);
    if (result) {
      return res.status(200).json({
        success: true,
        result,
      });
    }
    return res.status(200).json({
      success: false,
      mes: "User not found",
    });
  } catch (error) {
    console.log("get user by id error = " + error);
    return res.status(400).json({
      success: false,
      mes: error.message,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  try {
    var user = await mysql.getUserById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        mes: "User not found",
      });
    }
    if (data.username) {
      user.username = data.username;
    }
    if (data.birth) {
      user.birth = data.birth;
    }
    if (data.gender) {
      user.gender = data.gender;
    }
    if (data.address) {
      user.address = data.address;
    }
    if (data.image) {
      user.image = data.image;
    }

    if (data.phone) {
      user.phone = data.phone;
    }

    if (data.role) {
      user.role = data.role;
    }
    await mysql.updateUser(user, id);
    return res.status(200).json({
      success: true,
      mes: "update user success",
      user,
    });
  } catch (error) {
    console.log("err update user" + error);
    return res.status(400).json({
      success: false,
      mes: error.message,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    await mysql.deleteUser(req.params.id);
    return res.status(200).json({
      success: true,
      mes: "delete user success",
    });
  } catch (error) {
    console.log("err delete user" + error);
    return res.status(400).json({
      success: false,
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

// async function forgotPassword(req, res) {
//   const { email, phone } = req.body;

//   const checkUser = await mysql.checkForgotPasswordUser(
//     email ? email : phone
//   );

//   if (checkUser !== undefined) {
//     // Tạo token
//     const token = jwt.sign(
//       { userId: checkUser._id, email: checkUser.email },
//       "secret",
//       {
//         expiresIn: "90000", //15 phút
//       }
//     );

//     const subject = `Sports Zone Reset Password`;

//     var to = checkUser.email;

//     const htmlResult =
//       '<div style="padding: 50px; padding-left: 0px; width: 500px;">' +
//       "<h1>" +
//       `Xin chào ${checkUser.fullname}` +
//       "</h1>" +
//       "<p>Đã nhận được yêu cầu thay đổi mật khẩu cho tài khoản Sports Zone của bạn</p>" +
//       '<div style="display: flex; justify-content: center; margin: 50px 0;">' +
//       `<a href="http://localhost:5173/reset-password/?token=${token}" style="text-align: center;text-decoration: none; color: aliceblue; padding: 15px 0; width: 50%; background-color:#348edb;color: aliceblue; outline: none; border-radius: 4px; border: none; cursor: pointer;">` +
//       "Đặt lại mật khẩu" +
//       "</a>" +
//       "</div>" +
//       "<p>" +
//       "<b>Lưu ý đường dẫn này chỉ hoạt động trong 60 phút </b>" +
//       "</p>" +
//       '<p style="margin-top: 50px;">Thank you,</p>' +
//       "<p>The Sports Zone Team</p>" +
//       "</div>";
//     await mailer.sendMail(to, subject, htmlResult);
//     return {
//       idUser: checkUser._id,
//       fullname: checkUser.fullname,
//       token: token,
//     };
//   } else {
//     const error = "Email hoặc Số điện thoại không tồn tại";
//     throw error;
//   }
// }

// async function resetPassword(req) {
//   const data = req.body;
//   const tokenClient = req.params.resetCode;
//   // Giải mã token từ client
//   const decode = jwt.verify(tokenClient, "secret");

//   if (decode.userId) {
//     const hashedPassword = await bcrypt.hash(data.newPassword, 10);
//     await mysql.updateUser({ password: hashedPassword }, decode.userId);
//     return;
//   } else {
//     const error = "Mã token không hợp lệ hoặc đã hết hạn!";
//     throw error;
//   }
// }

module.exports = {
  getUsers: getUsers,
  register: register,
  login: login,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
  search: search,
  // forgotPassword,
  // resetPassword,
};
