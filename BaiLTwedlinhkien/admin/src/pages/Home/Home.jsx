import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAPI from "../../API/user";

import Button from "react-bootstrap/Button";
import CreateAndUpdateAdmin from "./Component/createAndUpdateAdmin";
import Delete from "../../components/modal/delete";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { HOST } from "../../domain/host/host";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddIcon from "@mui/icons-material/Add";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddAndUpdateUser from "../Users/component/addAndUpdateUser";

Home.propTypes = {};
function Home(props) {
  const name = sessionStorage.getItem("user");

  const [getUsers, setGetUsers] = useState([]);
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
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [getID, setgetID] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const getListUserApi = async () => {
    let filter = "?role=ADMIN";
    const response = await UserAPI.getAll(filter);
    const data = response.data.results.list;
    setGetUsers(data);
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
      alertify.error("Đã xoá user thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };
  //lấy tất cả users admin
  useEffect(() => {
    getListUserApi();
  }, []);
  // đóng modal delete
  const handleCloseModalDelete = () => setShowModalDelete(false);

  const handleCloseModalAdd = () => setShowModalAdd(false);

  const handleShowModalAdd = (id) => {
    if (id === 0) {
      setTitleModal("Thêm");
    }
    if (id !== 0) {
      setTitleModal("Cập nhật");
      setgetID(id);
      getAPIById(id);
    }
    setShowModalAdd(true);
  };
  // show modal delete
  const handleShowModalDelete = (id) => {
    setgetID(id);
    setShowModalDelete(true);
  };
  // xử lý delete product
  const hanldeDeleteUser = async () => {
    deleteDataAPI(getID);
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Hi {name}!
            </h3>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
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
                <div className="d-flex align-items-center mb-4">
                  <h4 className="card-title">Staff</h4>
                  <div className="ml-auto"></div>
                </div>

                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Hình đại diện</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUsers &&
                        getUsers.map((value) => (
                          <tr key={value.id}>
                            <td>
                              <img
                                src={value.image}
                                style={{ height: "60px", width: "60px" }}
                                alt=""
                              />
                            </td>
                            <td>{value.username}</td>
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
        <a href="#">
          B.N SHOP
        </a>
        .
      </footer>
    </div>
  );
}

export default Home;
