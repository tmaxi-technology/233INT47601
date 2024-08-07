import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Delete from "../../components/modal/delete";
import { HOST } from "../../domain/host/host";
import CreateAndUpdateCate from "./component/createAndUpdateCategory";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "@mui/material/Pagination";
const Categories = () => {
  const URL_CATE = `${HOST}/cate`;
  const URL_FilterCate = `${HOST}/filterCate`;

  const [getDataCate, setGetDataCate] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [getID, setgetID] = useState("");
  const [pagination, setPagination] = useState({});
  const [titleModal, setTitleModal] = useState("");
  const [dataCate, setDataCate] = useState({
    name: null,
    image: null,
    slug: null,
  });
  //lấy tất cả category
  useEffect(() => {
    axios
      .get(URL_CATE)
      .then((res) => {
        const page = Math.ceil(res.data.results.total / res.data.results.limit);
        setPagination({
          page: page,
          total: res.data.results.total,
          limit: res.data.results.limit,
          offset: res.data.results.offset,
        });
        setGetDataCate(res.data.results.list);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleShowModalAdd = (id) => {
    if (id === 0) {
      setTitleModal("Thêm");
    }
    if (id !== 0) {
      setTitleModal("Cập nhật");
      setgetID(id);
      axios
        .get(`${URL_CATE}/${id}`)
        .then((res) => setDataCate(res.data.result))
        .catch((err) => console.error(err));
    }
    setShowModalAdd(true);
  };
  const handleCloseModalAdd = () => setShowModalAdd(false);

  // đóng modal delete
  const handleCloseModalDelete = () => setShowModalDelete(false);
  // show modal delete
  const handleShowModalDelete = (id) => {
    setgetID(id);
    setShowModalDelete(true);
  };
  // xử lý delete product
  const hanldeDeleteUser = async () => {
    await axios.delete(`${URL_CATE}/${getID}`);
    alertify.set("notifier", "position", "top-right");
    alertify.error("Đã xoá thành công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };

  // const onChangeText = (e) => {
  //   const value = e.target.value;
  //   if (!value) {
  //     axios
  //       .get(URL_CATE)
  //       .then((res) => {
  //         setGetDataCate(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //     return;
  //   }
  //   axios
  //     .get(`${URL_FilterCate}/${value}`)
  //     .then((res) => setGetDataCate(res.data))
  //     .catch((err) => console.error("err", err.response));
  // };

  const handleChange = async (e, p) => {
    const offset = (p - 1) * pagination.limit;
    const filter = `?offset=${offset}`;
    axios
      .get(URL_CATE + filter)
      .then((res) => {
        const data = res.data.results.list;
        setGetDataCate(data);
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
                    Bộ sưu tập
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
                <h4 className="card-title">Bộ sưu tập</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form action="" style={{ display: "flex", width: "50%" }}>
                    {/* <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Nhập tên ... "
                        onChange={onChangeText}
                      />
                    </InputGroup> */}
                  </Form>
                  {/* <!-- Button trigger modal --> */}
                  <Button variant="light" onClick={() => handleShowModalAdd(0)}>
                    <AddIcon fontSize="large" />
                  </Button>
                </div>
                <br />
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên loại</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDataCate &&
                        getDataCate.map((value, inx) => (
                          <tr key={value.id}>
                            <td>{inx + 1}</td>
                            <td>{value.name}</td>
                            <td>
                              <EditIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModalAdd(value.id)}
                              />
                              &nbsp;
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModalDelete(value.id)}
                              />
                              <Delete
                                style={{ cursor: "pointer" }}
                                setshowDelete={showModalDelete}
                                handleCloseDelete={handleCloseModalDelete}
                                deleteUser={() => hanldeDeleteUser()}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination count={pagination.page} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateAndUpdateCate
        setShowModal={showModalAdd}
        setCloseModal={handleCloseModalAdd}
        setDataCate={setDataCate}
        dataCate={dataCate}
        getId={getID}
        titleModal={titleModal}
      />
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="#">B.N SHOP</a>.
      </footer>
    </div>
  );
};

export default Categories;
