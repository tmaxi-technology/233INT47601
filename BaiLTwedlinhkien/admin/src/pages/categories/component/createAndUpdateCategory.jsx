import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const CreateAndUpdateCate = (props) => {
  const dataCate = props.dataCate;
  const setDataCate = props.setDataCate;
  const getId = props.getId;
  const URL_CATE = `${HOST}/cate`;
  const { titleModal } = props

  const onSubmit = async (id) => {
    if (id) {
      await axios
        .put(`${URL_CATE}/${id}`, dataCate)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_CATE}`, dataCate);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  return (
    <Modal
      show={props.setShowModal}
      onHide={props.setCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{titleModal} loại sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên loại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên loại"
              value={dataCate.name}
              onChange={(e) =>
                setDataCate({ ...dataCate, name: e.target.value })
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

export default CreateAndUpdateCate;
