import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Modal from "react-bootstrap/Modal";
import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

// import FileBase64 from "react-file-base64";

const CreateAndUpdateAdmin = (props) => {
  const dataAdmin = props.dataAdmin;
  const setDataAdmin = props.setDataAdmin;
  const getId = props.getId;

  // Upload image on cloud 
  const [avatarUpload, setAvatarUpload] = useState("")
  const [loading, setLoading] = useState(false)
  const onChangeAvatarAdmin = (e) => {
    setAvatarUpload(e.target.files[0]);
  }

  useEffect(() => {
    const upLoadImages = async () => {
      if (avatarUpload) {
        const formData = new FormData();
        formData.append("file", avatarUpload)
        setLoading(!loading)
        try {
          const response = await axios.post(`${HOST}/upload-cloud`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          dataAdmin.avatar = response.data.avatar
          setLoading(false)
        }
        catch (err) {
          console.error("err upload image cloud", err);
        }
      }
    }
    upLoadImages()
  }, [avatarUpload])


  const onSubmit = async (id) => {
    const URL_ADDADMIN = `${HOST}/createAdmin`;
    const URL_UPDATEADMIN = `${HOST}/updateAdmin`;

    if (id) {
      await axios
        .put(`${URL_UPDATEADMIN}/${id}`, dataAdmin)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update user thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_ADDADMIN}`, dataAdmin);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm user thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  return (
    <Modal
      show={props.setShowModal}
      onHide={props.setCloseModal}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.titleModal} Admin</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* tên admin */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên admin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên admin"
              value={dataAdmin.fullname}
              onChange={(e) =>
                setDataAdmin({ ...dataAdmin, fullname: e.target.value })
              }
            />
            {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
          </Form.Group>

          {/* ảnh sản phẩm  */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Ảnh đại diện sản phẩm</Form.Label>
            {/* <FileBase64
              accept="image/*"
              multiple={false}
              type="file"
              className="form-control-file"
              id="image"
              value={dataAdmin.avatar}
              onDone={({ base64 }) =>
              setDataAdmin({ ...dataAdmin, avatar: base64 })
              }
            /> */}
            <img className="form-control-file" src={dataAdmin.avatar} alt="" style={{ height: "200px", width: "200px", objectFit: "cover", padding: "5px", margin: "auto" }} />
            <input type="file" onChange={onChangeAvatarAdmin}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="SDT"
                  value={dataAdmin.phone}
                  onChange={(e) =>
                    setDataAdmin({ ...dataAdmin, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>mssv</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mssv"
                  value={dataAdmin.mssv}
                  onChange={(e) =>
                    setDataAdmin({ ...dataAdmin, mssv: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mail"
              value={dataAdmin.email}
              onChange={(e) =>
                setDataAdmin({ ...dataAdmin, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Công việc chính</Form.Label>
            <Form.Control
              type="text"
              placeholder="DEV ................"
              value={dataAdmin.mainJob}
              onChange={(e) =>
                setDataAdmin({ ...dataAdmin, mainJob: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="..."
              value={dataAdmin.password}
              onChange={(e) =>
                setDataAdmin({ ...dataAdmin, password: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.setCloseModal}>Close</Button>
        {/* loading */}
        {
          !loading ?
            <Button variant="primary" onClick={() => onSubmit(getId)}>
              Lưu thay đổi
            </Button>
            :
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAndUpdateAdmin;
