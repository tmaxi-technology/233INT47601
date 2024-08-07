import React, { useEffect, useState } from "react";
import UserAPI from "../../API/user";
import axios from "axios";
import { HOST } from "../../domain/host/host";
import queryString from "query-string";

import Delete from "../../components/modal/delete";
import AddAndUpdateUser from "./component/addAndUpdateUser";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import InputGroup from "react-bootstrap/InputGroup";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Users(props) {
  const URL_SEARCH = `${HOST}/users/search`;

  const [dataUsers, setDataUsers] = useState([]);
  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    birth: "",
    gender: "",
    address: "",
    phone: "",
    role: "",
    image: "",
  });

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idUserDelete, setIdUserDelete] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [filedSearches, setFiledSearches] = useState("");

  const getListUserApi = async (filter = null) => {
    let response;
    if (filter) {
      response = await UserAPI.getAll(filter);
    } else {
      response = await UserAPI.getAll();
    }
    const data = response.data.results.list;
    setDataUsers(data);
    const results = response.data.results;
  };
  const getAPIById = async (id) => {
    const response = await UserAPI.getById(id);
    if (response.data.success) {
      setDataUser(response.data.result);
    }
  };
  const deleteDataAPI = async (id) => {
    const response = await UserAPI.delete(id);
    if (response.data.success) {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Đã xoá thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

  useEffect(() => {
    let filter = "?role=USER";
    getListUserApi(filter);
  }, []);

  // đóng modal delete
  const handleCloseModalDelete = () => setShowModalDelete(false);
  // show modal delete
  const handleShowModalDelete = (id) => {
    setIdUserDelete(id);
    setShowModalDelete(true);
  };
  // xử lý delete user
  const hanldeDeleteUser = async () => {
    deleteDataAPI(idUserDelete);
  };

  const handleCloseModalAdd = () => setShowModalAdd(false);

  //add & update product
  const handleShowModalAdd = (id) => {
    setDataUser({});
    if (id === 0) {
      setTitleModal("Thêm");
    }
    if (id !== 0) {
      setTitleModal("Cập nhật");
      getAPIById(id);
    }
    setShowModalAdd(true);
  };

  const onChangeText = (e) => {
    const value = e.target.value;
    const dataFilded = {
      fildter: filedSearches,
      value: value,
    };
    if (dataFilded.fildter === "") {
      dataFilded.fildter = "phone";
    }
    const query = "?" + queryString.stringify(dataFilded);
    if (!value) {
      getListUserApi();
    }
    axios
      .get(`${URL_SEARCH}${query}`)
      .then((res) => setDataUsers(res.data.result))
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
                    Quản lý khách hàng
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
                <h4 className="card-title">Quản lý khách hàng</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form action="" style={{ display: "flex" }}>
                    <InputGroup className="mb-3">
                      <Form.Select
                        className=""
                        value={!filedSearches ? "phone" : filedSearches}
                        onChange={(e) => setFiledSearches(e.target.value)}
                      >
                        <option value="phone">Số điện thoại</option>
                        <option value="email">Email</option>
                        <option value="username">Tên khách hàng</option>
                      </Form.Select>
                      <Form.Control
                        className="w-50"
                        placeholder="Tìm kiếm"
                        onChange={onChangeText}
                      />
                    </InputGroup>
                  </Form>
                  <Button variant="light" onClick={() => handleShowModalAdd(0)}>
                    <AddIcon fontSize="large" />
                  </Button>
                </div>
                <br />
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Hình đại diện</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataUsers &&
                        dataUsers.map((value) => (
                          <tr key={value.id}>
                            <td
                              className="align-middle"
                              style={{ height: "25%", width: "20%" }}
                            >
                              <img
                                src={
                                  value.image
                                    ? value.image
                                    : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                                }
                                style={{ height: "25%", width: "30%" }}
                                alt=""
                              />
                            </td>
                            <td>{value.username}</td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
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
                                setshowDelete={showModalDelete}
                                handleCloseDelete={handleCloseModalDelete}
                                deleteUser={() => hanldeDeleteUser()}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <AddAndUpdateUser
                    setShowModal={showModalAdd}
                    setCloseModal={handleCloseModalAdd}
                    setDataUser={setDataUser}
                    dataUser={dataUser}
                    titleModal={titleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="https://www.facebook.com/profile.php?id=100090752721069">
          B.N SHOP
        </a>
        .
      </footer>
    </div>
  );
}

export default Users;
