import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const CreateAndUpdateCoupons = (props) => {
  const dataCoupons = props.dataCoupons;
  const setdataCoupons = props.setdataCoupons;
  const getId = props.getId;
  const URL_COUPONS = `${HOST}/coupons`;
  const URL_UPDATECATE = `${HOST}/coupons`;
  const { titleModal } = props

  const onSubmit = async (id) => {
    if (id) {
      await axios
        .put(`${URL_COUPONS}/${id}`, dataCoupons)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update voucher thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_COUPONS}`, dataCoupons);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm voucher thành công!");
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
        <Modal.Title>{titleModal} voucher</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên voucher</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên voucher"
              value={dataCoupons.name}
              onChange={(e) =>
                setdataCoupons({ ...dataCoupons, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>giảm (%)</Form.Label>
            <Form.Control
              type="number"
              placeholder="10"
              value={dataCoupons.percent}
              onChange={(e) =>
                setdataCoupons({ ...dataCoupons, percent: e.target.value })
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

export default CreateAndUpdateCoupons;
