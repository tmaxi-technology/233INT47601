import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { formatNumberWithCommas } from "../../../components/utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { HOST } from "../../../domain/host/host";
import { orderStatus } from "../../../domain/status/status";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import ExportBill from "./ExportBill";

import format from "date-fns/format";
const View = (props) => {
  const urlUpdateStatus = `${HOST}/updateStatus`;
  const { dataBill, getId, getDetailBill } = props;
  console.log("dataBill", dataBill);
  const [listProduct, setListProduct] = useState([]);

  const [changeStatus, setChangeStatus] = useState("");
  const listNameProduct = dataBill.nameProduct
    ? dataBill.nameProduct.split(",")
    : [];
  const listSize = dataBill.size ? dataBill.size.split(",") : null;
  const listQuantity = dataBill.quantity ? dataBill.quantity.split(",") : null;
  const listPrice = dataBill.price ? dataBill.price.split(",") : null;

  const [timeExportBill, setTimeExportBill] = useState("");
  const [showModalExportBill, setshowModalExportBill] = useState(false);
  const handleCloseModalExport = () => {
    setshowModalExportBill(false);
  };
  const handleShowModalExport = () => {
    setshowModalExportBill(true);
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // tháng bắt đầu từ 0
    let dd = today.getDate();
    let hh = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (hh < 10) hh = "0" + hh;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    // lấy ra ngày tháng năm và giờ phút giây hiện tại
    const formatted =
      yyyy + "-" + mm + "-" + dd + " " + hh + ":" + minutes + ":" + seconds;
    setTimeExportBill(formatted);
  };

  for (let i = 0; i < listNameProduct.length; i++) {
    const obj = {};
    obj.name = listNameProduct[i];
    obj.size = listSize[i];
    obj.quantity = listQuantity[i];
    obj.price = listPrice[i];
    listProduct.push(obj);
  }
  const orderConfirmation = async () => {
    let status = orderStatus["Đang vận chuyển"];
    dataBill.status = status;
    await axios.put(`${urlUpdateStatus}/${dataBill._id}`, dataBill);
    alertify.set("notifier", "position", "top-right");
    alertify.success("Vui lòng chờ trong giây lát!");
    setTimeout(function () {
      // setChangeStatus(dataBill.status);
      props.reloadData();
    }, 3000);
  };

  const orderShipping = async () => {
    let status = orderStatus["Hoàn thành"];
    dataBill.status = status;
    await axios.put(`${urlUpdateStatus}/${dataBill._id}`, dataBill);
    alertify.set("notifier", "position", "top-right");
    alertify.success("Vui lòng chờ trong giây lát!");
    setTimeout(function () {
      // setChangeStatus(dataBill.status);
      props.reloadData();
    }, 3000);
  };

  // const exportBill = () => {
  //   console.log("xuat bill");
  //   const doc = new jsPDF();
  //   doc.text("Cảm ơn bạn đã đến B.N Shop", 10, 10);
  //   doc.text("Đơn hàng của bạn",10,10)
  //   doc.save("a4.pdf");
  // };

  return (
    <Modal show={props.showModalView} onHide={props.setCloseModal} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Đơn Hàng</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mã hoá đơn</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Mã hoá đơn"
                  value={dataBill.id}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Địa chỉ"
                  value={dataBill.address}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên khách hàng</Form.Label>

                <Form.Control
                  disabled
                  type="text"
                  placeholder="Tên khách hàng"
                  value={dataBill.user_id}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control disabled type="text" value={dataBill.phone} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control disabled type="text" value={dataBill.email} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ngày đặt hàng</Form.Label>
                <Form.Control
                  disabled
                  type="datetime"
                  value={
                    dataBill?.created_date
                      ? format(
                          new Date(dataBill?.created_date) ?? new Date(),
                          "HH:mm, dd/MM/yyyy"
                        )
                      : ""
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell Dessert>Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng&nbsp;(cái)</TableCell>
                <TableCell align="right">giá&nbsp;(vnđ)</TableCell>
                <TableCell align="right">Thành tiền&nbsp;(vnđ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDetailBill &&
                getDetailBill.map((val, key) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={key}
                  >
                    <TableCell component="th" scope="row">
                      {val.product_id}
                    </TableCell>
                    <TableCell align="right">{val.quantity}</TableCell>
                    <TableCell align="right">
                      {parseInt(val.price).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(val.total)}
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={3}>
                  <b>Tổng:</b>
                </TableCell>
                <TableCell align="right">
                  {parseInt(dataBill.amount).toLocaleString()}(vnđ)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer>
        {dataBill.reasonCancel && (
          <Button variant="danger">Đơn hàng bị huỷ</Button>
        )}

        {dataBill.status === orderStatus["Đang vận chuyển"] && (
          <Button variant="success" onClick={() => orderShipping()}>
            Đã nhận được hàng
          </Button>
        )}

        {dataBill.status === orderStatus["Chờ xác nhận"] &&
          dataBill.status === orderStatus["Chờ xác nhận"] && (
            <Button variant="warning" onClick={() => orderConfirmation()}>
              Xác nhận đơn hàng
            </Button>
          )}

        {dataBill.status === orderStatus["Đã hủy"] ? (
          ""
        ) : (
          <Button variant="info" onClick={() => handleShowModalExport()}>
            Xuất hoá đơn
          </Button>
        )}
        {showModalExportBill && (
          <ExportBill
            getTimeExportBill={timeExportBill}
            setCloseModal={handleCloseModalExport}
            show={showModalExportBill}
            dataProduct={listProduct}
            dataBill={dataBill}
            detailBill={getDetailBill}
          />
        )}
        <Button variant="secondary" onClick={props.setCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View;
