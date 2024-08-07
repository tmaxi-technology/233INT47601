import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Delete from "../../components/modal/delete";
import { HOST } from "../../domain/host/host";
import CreateAndUpdateBrand from "./component/createAndUpdateBrand";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import View from "./component/view";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import AddIcon from "@mui/icons-material/Add";
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Brand = () => {
  // const URL_BRAND = `${HOST}/brand`; 
  const URL_BRAND = `${HOST}/provider`;
  const URL_FILTERBRAND = `${HOST}/filter-brand`;

  const [getDataBrand, setgetDataBrand] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [getID, setgetID] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [dataBrand, setdataBrand] = useState({
    name: null,
    phone: null,
    email: null,
    image: null,
    quantity: null,
    slug: null,
  });
  //lấy tất cả category
  useEffect(() => {
    axios
      .get(URL_BRAND)
      .then((res) => setgetDataBrand(res.data.results.list))
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
        .get(`${URL_BRAND}/${id}`)
        .then((res) => setdataBrand(res.data.result))
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
    await axios.delete(`${URL_BRAND}/${getID}`);
    alertify.set("notifier", "position", "top-right");
    alertify.error("Đã xoá thương hiệu thành công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };

  //view
  const handleShowModalView = (id) => {
    setgetID(id);
    axios
      .get(`${URL_BRAND}/${id}`)
      .then((res) => setdataBrand(res.data))
      .catch((err) => console.error(err));
    setShowModalView(true);
  };
  const handleCloseModalView = () => setShowModalView(false);

  const onChangeText = (e) => {
    const value = e.target.value;
    console.log("value", value);
    if (!value) {
      axios
        .get(URL_BRAND)
        .then((res) => setgetDataBrand(res.data))
        .catch((err) => console.log(err));
      return;
    }
    axios
      .get(`${URL_FILTERBRAND}/${value}`)
      .then((res) => setgetDataBrand(res.data))
      .catch((err) => console.error("err", err.response));
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
                    Nhà cung cấp
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
                <h4 className="card-title">Nhà cung cấp</h4>
                <div
                  style={{
                    display: "flex",
                    "justify-content": "space-between",
                  }}
                >
                  <Form action="" style={{ display: "flex" }}>
                    {/* <InputGroup className="mb-3">
                      <Form.Control
                        className="w-50"
                        placeholder="tìm kiếm"
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
                        <th>Tên nhà cung cấp</th>
                        <th>Số lượng (cái)</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDataBrand &&
                        getDataBrand.map((value, inx) => (
                          <tr key={value.id}>
                            <td>{inx + 1}</td>
                            <td>{value.name}</td>
                            <td>{value.quantity}</td>
                            <td>
                              <EditIcon style={{ cursor: "pointer" }} onClick={() => handleShowModalAdd(value.id)} />
                              &nbsp;
                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleShowModalDelete(value.id)} />
                              &nbsp;
                              {/* <WysiwygIcon style={{ cursor: "pointer" }} onClick={() => handleShowModalView(value._id)} /> */}
                              <Delete
                                setshowDelete={showModalDelete}
                                handleCloseDelete={handleCloseModalDelete}
                                deleteUser={() => hanldeDeleteUser()}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateAndUpdateBrand
        setShowModal={showModalAdd}
        setCloseModal={handleCloseModalAdd}
        setdataBrand={setdataBrand}
        dataBrand={dataBrand}
        getId={getID}
        titleModal={titleModal}
      />
      {/* <View
        setShowModal={showModalView}
        setCloseModal={handleCloseModalView}
        setdataBrand={setdataBrand}
        dataBrand={dataBrand}
        getId={getID}
      /> */}
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="https://www.facebook.com/profile.php?id=100090752721069">B.N SHOP</a>.
      </footer>
    </div>
  );
};

export default Brand;
