import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const FormRegister = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const submitFormRegister = () => {
    if (validateRegister()) {
      props.handleShowForm();
      return;
    }
  };

  const validateRegister = () => {
    var error = {};
    var valid = true;

    if (fullName === "") {
      error.fullName = "Tên người dùng không được bỏ trống!";
      valid = false;
    }
    if (email === "") {
      error.email = "Email không được bỏ trống!";
      valid = false;
    }
    if (password === "") {
      error.password = "Mật khẩu không được bỏ trống!";
      valid = false;
    }
    setErrors(error);
    return valid;
  };
  return (
    <div>
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "full",
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            borderRadius: "8px",
            padding: "20px",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            background: "white",
            boxShadow: "0px 5px 10px 5px #208080;", // X, Y,Độ mờ, kích thước độ mờ
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              background: "linear-gradient(to right, #208080 0%, #0b4040 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
            variant="h3"
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Đăng ký
          </Typography>

          <TextField
            fullWidth
            error={errors.fullName ? true : false}
            id="outlined-basic"
            label="Họ và tên"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            helperText={errors.fullName ? errors.fullName : ""}
          />

          <TextField
            fullWidth
            error={errors.email ? true : false}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email ? errors.email : ""}
          />

          <TextField
            fullWidth
            error={errors.password ? true : false}
            id="outlined-basic"
            label="Mật khẩu"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors.password ? errors.password : ""}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitFormRegister()}
          >
            Đăng Ký
          </Button>
          <Box>
            <Typography color={"GrayText"}>
              Bạn đã có tài khoản?
              <Button onClick={() => props.handleShowForm()} variant="text">
                Đăng nhập
              </Button>
            </Typography>
          </Box>
        </Box>
      </FormControl>
    </div>
  );
};

export default FormRegister;
