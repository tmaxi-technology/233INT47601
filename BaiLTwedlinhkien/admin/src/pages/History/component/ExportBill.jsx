import React, { useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import format from "date-fns/format";

const ExportBill = (props) => {
  const timeExportBill = props.getTimeExportBill;
  const listProduct = props.dataProduct;
  const dataBill = props.dataBill;
  const getDetailBill = props.detailBill;
  const invoiceRef = useRef(null);
  const exportBill = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 0.9 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();
      doc.setFont("Times New Roman");
      doc.addImage(imgData, "PNG", 10, 10, 200, 200);
      doc.save(`hoa-don-${dataBill.fullname}.pdf`);
    });
  };
  return (
    <Modal show={props.show} onHide={props.setCloseModal} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Xuất Hóa Đơn</Modal.Title>
      </Modal.Header>

      <Modal.Body ref={invoiceRef}>
        <Form>
          <Row className="text-center mb-3">
            <h1>B.N SHOP</h1>
            <p>Địa chỉ: 64 Võ Công Tồn, Q.Tân Phú, TP.HCM</p>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số hoá đơn</Form.Label>
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
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Trạng thái"
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
                <Form.Label>Ngày đặt hàng</Form.Label>
                <Form.Control
                  disabled
                  type="text"
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
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ngày xuất hóa đơn</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={
                    timeExportBill
                      ? format(
                          new Date(timeExportBill) ?? new Date(),
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
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Tình trạng sản phẩm</TableCell>
                <TableCell align="right">Số lượng&nbsp;(cái)</TableCell>
                <TableCell align="right">giá&nbsp;(vnđ)</TableCell>
                <TableCell align="right">Thành tiền&nbsp;(vnđ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDetailBill.map((val, key) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={key + 1}
                >
                  <TableCell component="th" scope="row">
                    {val.product_id}
                  </TableCell>
                  <TableCell align="right">Fullbox</TableCell>
                  <TableCell align="right">{val.quantity}</TableCell>
                  <TableCell align="right">
                    {parseInt(val.price).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {parseInt(val.price * val.quantity).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={3}>
                  <b>Tổng (Đã bao gồm thuế VAT):</b>
                </TableCell>
                <TableCell align="right">
                  {parseInt(dataBill.amount).toLocaleString()}(vnđ)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h4 className="text-center mt-3">B.N SHOP xin cảm ơn</h4>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => exportBill()}>
          In hoá đơn
        </Button>
        <Button variant="secondary" onClick={props.setCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportBill;
