import React, { useState } from "react";
import axios from "axios";

import queryString from "query-string";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import FileBase64 from "react-file-base64";
import { Col, Row } from "react-bootstrap";

const AddUser = () => {
  const URL_ADDUSER = "http://localhost:3003/users/signup";
  const [data, setData] = useState({
    avatar: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const onSubmit = async () => {
    // const query = "?" + queryString.stringify(data);
    await axios.post(`${URL_ADDUSER}`, data);
    alertify.set("notifier", "position", "top-right");
    alertify.success("Bạn Đã thêm User Thành Công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };
  return (
    //    {/* <!-- Modal --> */}
    <div
      className="modal fade bd-example-modal-lg"
      id="addUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add User
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="form-group">
                <label for="exampleInputEmail1">Họ tên</label>
                <input
                  type="nameAccount"
                  className="form-control"
                  id="nameAccount"
                  placeholder="Họ tên"
                  value={data.fullname}
                  onChange={(e) =>
                    setData({ ...data, fullname: e.target.value })
                  }
                />
              </div>

              <Row>
                <Col>
                  <div className="form-group">
                    <label for="exampleFormControlFile1">Hình đại diện </label>
                    <FileBase64
                      accept="image/*"
                      multiple={false}
                      type="file"
                      className="form-control-file"
                      id="image"
                      value={data.avatar}
                      onDone={({ base64 }) =>
                        setData({ ...data, avatar: base64 })
                      }
                    />
                  </div>
                </Col>

                <Col>
                  <div className="form-group">
                    <img
                      style={{ height: "30%", width: "30%" }}
                      // className="w-30"
                      src={data.avatar ? data.avatar : 'https://gocbao.net/wp-content/uploads/2020/10/avatar-trang-4.jpg'}
                      alt="avt"
                    />
                  </div>
                </Col>
              </Row>

              <div className="form-group">
                <label for="exampleInputPassword1">email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Số điện thoại</label>
                <input
                  type="category"
                  className="form-control"
                  id="category"
                  placeholder="Số điện thoại"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mật khẩu"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
