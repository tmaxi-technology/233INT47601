import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";

import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const View = (props) => {
  const dataBrand = props.dataBrand;
  const setdataBrand = props.setdataBrand;
  const getId = props.getId;
  const URL_ADDBRAND = `${HOST}/createBrand`;
  const URL_UPDATEBRAND = `${HOST}/updateBrand`;
  const URL_FILTERBYBRAND = `${HOST}/searchProducts`;

  const [productByBrand, setProductsByBrand] = useState([]);

  useEffect(() => {
    if (!dataBrand.nameBrand) return;
    const dataFilded = {
      fildter: "brand",
      value: dataBrand.nameBrand,
    };
    const query = "?" + queryString.stringify(dataFilded);
    axios
      .get(`${URL_FILTERBYBRAND}${query}`)
      .then((res) => setProductsByBrand(res.data))
      .catch((err) => console.error("err", err.response));
  }, [dataBrand.nameBrand]);

  return (
    <Modal show={props.setShowModal} onHide={props.setCloseModal} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết nhà cung cấp</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên nhà cung cấp</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Tên nhà cung cấp"
              value={dataBrand.nameBrand}
              onChange={(e) =>
                setdataBrand({ ...dataBrand, nameBrand: e.target.value })
              }
            />
          </Form.Group>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} >STT</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Tên sản phẩm</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Loại sản phẩm</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }} >Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productByBrand.map((row, inx) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {inx + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.setCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View;
