import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import UserAPI from "../../API/user";
const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  // Show/hide password
  const [typePassWord, setTypePassWord] = useState("password");

  // check login
  const validateFormSignin = () => {
    let isValid = true;
    const error = {};

    if (!user.email) {
      isValid = false;
      error.email = "email không được để trống!";
    }

    if (!user.password) {
      isValid = false;
      error.password = "Mật khẩu không được để trống!";
    }

    if (!user.password && !user.email) {
      isValid = false;
      error.mes = "Email và mật khẩu không được để trống!";
    }
    setErrors(error);
    return isValid;
  };

  const logIn = async () => {
    var checkValidate = validateFormSignin();
    if (!checkValidate) return;
    const response = await UserAPI.logIn(user);
    const data = response.data;
    if (data.success) {
      if (data.data.role !== "ADMIN") {
        alert("Tài khoản của bạn không được phép đăng nhập vào hệ thống");
        return;
      }
      sessionStorage.setItem("user", data.data.username);
      sessionStorage.setItem("mail", data.data.email);
      window.location.reload();
    }
    if (!data.success) {
      console.log(data);
      setErrors({ ...errors, mes: data.mes });
    }
  };
  return (
    <Modal show={true} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>ĐĂNG NHẬP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {errors.mes && <p className="text-danger">{errors.mes}</p>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={!user ? "" : user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={!user ? "" : user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => logIn()}>
          Đăng nhập
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignIn;