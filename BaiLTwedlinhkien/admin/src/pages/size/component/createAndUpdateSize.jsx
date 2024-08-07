import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const CreateAndUpdateSize = (props) => {
  const [category, setCategory] = useState([]);

  const dataSize = props.dataSize;
  const setdataSize = props.setdataSize;
  const getId = props.getId;
  const URL_ADDCATE = `${HOST}/createSize`;
  const URL_UPDATECATE = `${HOST}/updateSize`;
  const URL_GETCATEGORY = `${HOST}/categories`;

  const onSubmit = async (id) => {
    if (id) {
      console.log(`${URL_UPDATECATE}/${id}`, dataSize);
      await axios
        .put(`${URL_UPDATECATE}/${id}`, dataSize)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn Đã update loại Thành Công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_ADDCATE}`, dataSize);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn Đã thêm loại Thành Công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

  useEffect(() => {
    axios
      .get(URL_GETCATEGORY)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={props.setShowModal} onHide={props.setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Số size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Số size"
              value={dataSize.nameSize}
              onChange={(e) =>
                setdataSize({ ...dataSize, nameSize: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>loại sản phẩm</Form.Label>
            <br />
            <Form.Select
              value={dataSize.cateProduct}
              onChange={(e) =>
                setdataSize({
                  ...dataSize,
                  cateProduct: e.target.value,
                })
              }
            >
              <option>Loại sản phẩm</option>
              {category.map((val, key) => (
                <option key={key} value={val.nameCate}>
                  {val.nameCate}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.setCloseModal}>
          Đóng
        </Button>
        <Button variant="primary" onClick={() => onSubmit(getId)}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAndUpdateSize;
