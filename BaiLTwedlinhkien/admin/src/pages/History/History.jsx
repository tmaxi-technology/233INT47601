import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { HOST } from "../../domain/host/host";
import View from "./component/view";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { formatNumberWithCommas } from "../../components/utils";
import queryString from "query-string";
import Pagination from "@mui/material/Pagination";

function History(props) {
  const URL_FILTERBILL = `${HOST}/filterBill`;
  const URL_BILL = `${HOST}/receipts`;
  const URL_DETAIL_BILL = `${HOST}/receipt_details`;
  const [history, setHistory] = useState([]);
  const [getID, setgetID] = useState("");
  const [showModalView, setShowModalView] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [getDataBill, setGetDataBill] = useState({});
  const [getDetailBill, setGetDetailBill] = useState([]);
  const [pagination, setPagination] = useState({});
  const [totalPage, setTotalPage] = useState();
  const [revenue, setRevenue] = useState("");

  useEffect(() => {
    axios
      .get(URL_BILL)
      .then((res) => {
        setRevenue(res.data.results.revenue);
        setHistory(res.data.results.list);
        const page = Math.ceil(res.data.results.total / res.data.results.limit);
        setPagination({
          page: page,
          total: res.data.results.total,
          limit: res.data.results.limit,
          offset: res.data.results.offset,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const handleReloadData = () => {
    setReloadData(!reloadData);
  };

  const handleShowModalView = (id) => {
    setgetID(id);
    axios
      .get(`${URL_BILL}/${id}`)
      .then((res) => {
        // console.log('resss',res.data);
        setGetDataBill(res.data.result);
      })
      .catch((err) => console.error(err));
    axios
      .get(`${URL_DETAIL_BILL}/${id}`)
      .then((res) => {
        setGetDetailBill(res.data.result);
      })
      .catch((err) => console.error(err));
    setShowModalView(true);
  };
  const handleCloseModalView = () => setShowModalView(false);

  const onChangeText = (e) => {
    const value = e.target.value;
    const dataFilded = {
      fildter: "id",
      value: value,
    };
    const query = "?" + queryString.stringify(dataFilded);
    if (!value) {
      axios
        .get(URL_BILL)
        .then((response) => setHistory(response.data.results.list))
        .catch((error) => console.log(error));
      return;
    }
    axios
      .get(`${URL_FILTERBILL}${query}`)
      .then((res) => {
        console.log("res", res);
        setHistory(res.data.result);
      })
      .catch((err) => console.error("err", err.response));
  };

  function formatDate(date) {
    let dateOder = new Date(date);
    let day = dateOder.getDate();
    let month = dateOder.getMonth() + 1;
    let year = dateOder.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleChange = async (e, p) => {
    const offset = (p - 1) * pagination.limit;
    const filter = `?offset=${offset}`;
    axios
      .get(URL_BILL + filter)
      .then((res) => {
        const data = res.data.results.list;
        setHistory(data);
      })
      .catch((err) => console.log(err));
    return;
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Trang chủ
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Quản lý kinh doanh
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Quản lý đơn hàng
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Quản lý đơn hàng</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form action="" style={{ display: "flex" }}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        className="w-50"
                        placeholder="Tìm kiếm"
                        onChange={onChangeText}
                      />
                    </InputGroup>
                  </Form>
                  <Form action="" style={{ display: "flex" }}>
                    <h4>Tổng doanh thu: {formatNumberWithCommas(revenue)}</h4>
                  </Form>
                </div>
                <br />
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên</th>
                        <th>Tổng</th>
                        <th>Ngày đặt</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history &&
                        history.map((value, inx) => (
                          <tr key={value.id}>
                            <td>{inx + 1}</td>
                            <td>{value.id}</td>
                            <td>{value.user_id}</td>
                            <td>{parseInt(value.amount).toLocaleString()}</td>
                            <td>{formatDate(value.created_date)}</td>
                            <td>
                              <Button
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-success"
                                onClick={() => handleShowModalView(value.id)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination count={pagination.page} onChange={handleChange} />
                  <View
                    setDataView={setGetDataBill}
                    showModalView={showModalView}
                    setCloseModal={handleCloseModalView}
                    dataBill={getDataBill}
                    getId={getID}
                    getDetailBill={getDetailBill}
                    reloadData={handleReloadData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="#">B.N SHOP</a>.
      </footer>
    </div>
  );
}

export default History;
