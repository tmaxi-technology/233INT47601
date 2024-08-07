import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useEffect } from "react";
import { useState } from "react";

const CreateAndUpdateType = (props) => {
  const dataType = props.dataType;
  const setDataType = props.setDataType;
  const getId = props.getId;
  const URL_TYPE = `${HOST}/Type`;
  const URL_CATE = `${HOST}/cate`;
  const { titleModal } = props;

  const [cate, setCate] = useState([]);

  useEffect(() => {
    axios
      .get(URL_CATE)
      .then((res) => setCate(res.data.results.list))
      .catch((err) => console.error("err", err));
  }, []);

  const onSubmit = async (id) => {
    if (id) {
      await axios
        .put(`${URL_TYPE}/${id}`, dataType)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_TYPE}`, dataType);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  return (
    <Modal show={props.setShowModal} onHide={props.setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titleModal} loại sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Loại sản phẩm</Form.Label>
            <br />
            <Form.Select
              value={dataType.category_id}
              onChange={(e) =>
                setDataType({
                  ...dataType,
                  category_id: e.target.value,
                })
              }
            >
              <option>Loại sản phẩm</option>
              {cate.map((val, key) => (
                <option key={key} value={val.id}>
                  {val.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên loại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên loại"
              value={dataType.name}
              onChange={(e) =>
                setDataType({ ...dataType, name: e.target.value })
              }
            />
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

export default CreateAndUpdateType;
