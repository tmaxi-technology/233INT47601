import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HOST } from "../../../domain/host/host";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const CreateAndUpdateBrand = (props) => {
  const dataBrand = props.dataBrand;
  const setdataBrand = props.setdataBrand;
  const getId = props.getId;
  const URL_BRAND = `${HOST}/provider`;
  const URL_UPDATEBRAND = `${HOST}/provider`;
  const { titleModal } = props;

  const onSubmit = async (id) => {
    if (id) {
      // console.log(`${URL_UPDATEBRAND}/${id}`, dataBrand);
      await axios
        .put(`${URL_BRAND}/${id}`, dataBrand)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update thương hiệu thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_BRAND}`, dataBrand);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm thương hiệu thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  return (
    <Modal show={props.setShowModal} onHide={props.setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titleModal} nhà cung cấp</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên nhà cung cấp</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên nhà cung cấp"
              value={dataBrand.name}
              onChange={(e) =>
                setdataBrand({ ...dataBrand, name: e.target.value })
              }
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="phone"
                  value={dataBrand.phone}
                  onChange={(e) =>
                    setdataBrand({ ...dataBrand, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email "
                  value={dataBrand.email}
                  onChange={(e) =>
                    setdataBrand({ ...dataBrand, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số lương (cái)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Số lượng : 20 (cái)"
                  value={dataBrand.quantity}
                  onChange={(e) =>
                    setdataBrand({ ...dataBrand, quantity: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
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

export default CreateAndUpdateBrand;
