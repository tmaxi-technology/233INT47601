import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAPI from "../../../API/user";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
// import FileBase64 from "react-file-base64";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { HOST } from "../../../domain/host/host";

const AddUser = (props) => {
  const setCloseModal = props.setCloseModal;
  const setData = props.setDataUser;
  const data = props.dataUser;

  // Upload image on cloud
  const [avatarUpload, setAvatarUpload] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState({});
  const onChangeAvatarUser = (e) => {
    setAvatarUpload(e.target.files[0]);
  };

  const createData = async (data) => {
    const response = await UserAPI.create(data);
    if (!response.data.success) {
      setError(response.data.mes);
      return;
    }
    setError("");
    if (response.data.success) {
      alertify.set("notifier", "position", "top-right");
      alertify.success("Đã thêm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  const updateData = async (id, data) => {
    const response = await UserAPI.update(id, data);
    if (!response.data.success) {
      setError(response.data.mes);
      return;
    }
    setError("");
    if (response.data.success) {
      alertify.set("notifier", "position", "top-right");
      alertify.success("Update thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  useEffect(() => {
    const upLoadImages = async () => {
      if (avatarUpload) {
        const formData = new FormData();
        formData.append("image", avatarUpload);
        setLoading(!loading);
        try {
          const response = await axios.post(`${HOST}/upload-cloud`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          data.image = response.data.img;
          setLoading(false);
        } catch (err) {
          console.error("err upload image cloud", err);
        }
      }
    };
    upLoadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarUpload]);
  function isValidEmail(email) {
    // Biểu thức chính quy để kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const onSubmit = async (id) => {
    // check mail
    const mail = data.email;
    if (isValidEmail(mail)) {
      if (id) {
        updateData(id, data);
      } else {
        createData(data);
      }
    } else {
      alert("Email không hợp lệ.");
    }
  };
  return (
    //    {/* <!-- Modal --> */}
    <Modal show={props.setShowModal} onHide={props.setCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{props.titleModal} khách hàng</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form>
          {/* tên user  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Họ Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên khách hàng"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
          </Form.Group>

          <Row>
            <Col>
              {/* SDT */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số điện thoại </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Số điện thoại"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  disabled={data.id ? true : false}
                />
                {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
              </Form.Group>
            </Col>
            <Col>
              {/* SDT */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select
                  value={data.gender ? data.gender : "nam"}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="0">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* address */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Địa chỉ"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
            {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
          </Form.Group>

          <Row>
            <Col>
              {/* email */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  disabled={data.id ? true : false}
                />
                {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
              </Form.Group>
            </Col>
            <Col>
              {/* birth */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Ngày sinh"
                  value={data.birth}
                  onChange={(e) => setData({ ...data, birth: e.target.value })}
                />
                {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* pass */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  disabled={data.id ? true : false}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
              </Form.Group>
            </Col>
            <Col>
              {/* role */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                >
                  <option value="0">Chọn ROLE</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="GUEST">GUEST</option>
                  <option value="MANAGER">MANAGER</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* ảnh người dùng */}
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Ảnh đại diện người dùng</Form.Label>
                {/* <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  className="form-control-file"
                  id="image"
                  value={dataUser.avatar}
                  onDone={({ base64 }) =>
                    setDataUser({ ...dataUser, avatar: base64 })
                  }
                /> */}
                <input type="file" onChange={onChangeAvatarUser} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <img
                  style={{ height: "30%", width: "30%" }}
                  src={
                    data.image
                      ? data.image
                      : "https://gocbao.net/wp-content/uploads/2020/10/avatar-trang-4.jpg"
                  }
                  alt=""
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={setCloseModal}>
          Đóng
        </Button>
        {/* loading */}
        {!loading ? (
          <Button variant="primary" onClick={() => onSubmit(data.id)}>
            Lưu thay đổi
          </Button>
        ) : (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
