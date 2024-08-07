import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Delete from "../../components/modal/delete";
import { HOST } from "../../domain/host/host";
import CreateAndUpdateSize from "./component/createAndUpdateSize";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { Form } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";

import Pagination from "../../components/pagination/Pagination";
import queryString from "query-string";

const Size = () => {
  const URL_SIZE = `${HOST}/size`;
  const URL_DETAILSIZE = `${HOST}/size`;
  const URL_DELETESIZE = `${HOST}/deleteSize`;
  const URL_GETCATEGORY = `${HOST}/categories`;
  const URL_SEARCHBYCATE = `${HOST}/searchSizeByCate`;
  const URL_PAGINATION = `${HOST}/sizePagination`;

  const [category, setCategory] = useState([]);
  const [filedSearches, setFiledSearches] = useState("");
  const [getDataSize, setgetDataSize] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [getID, setgetID] = useState("");
  const [dataSize, setdataSize] = useState({
    nameSize: "",
    cateProduct: "",
  });
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPagination] = useState({
    page: "1",
    count: "5",
    category: "all",
  });

  //Tổng số trang
  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log("Value: ", value);
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      category: pagination.category,
    });
  };

  //lấy tất cả category
  useEffect(() => {
    // axios
    //   .get(URL_SIZE)
    //   .then((res) => setgetDataSize(res.data))
    //   .catch((err) => console.log(err));
    axios
      .get(URL_GETCATEGORY)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const result = await axios.get(URL_SIZE);
      const response = result.data;
      // Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPageResult = Math.ceil(
        parseInt(response.length) / parseInt(pagination.count)
      );
      // setgetDataSize(response)
      setTotalPage(totalPageResult);
    };
    fetchAllData();
  }, [pagination]);

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        category: pagination.category,
      };
      const query = queryString.stringify(params);
      const newQuery = "?" + query;
      console.log("newQuery", newQuery);
      console.log(`${URL_SIZE}/pagination${newQuery}`);
      const response = await axios.get(`${URL_PAGINATION}${newQuery}`);
      console.log("response", response);
      setgetDataSize(response.data);
    };
    fetchData();
  }, [pagination]);

  const handleShowModalAdd = (id) => {
    if (id !== 0) {
      setgetID(id);
      axios
        .get(`${URL_DETAILSIZE}/${id}`)
        .then((res) => setdataSize(res.data))
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
    await axios.delete(`${URL_DELETESIZE}/${getID}`);
    alertify.set("notifier", "position", "top-right");
    alertify.error("Đã xoá admin thành công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };

  const onChangeText = (e) => {
    const value = e.target.value;
    setFiledSearches(value);
    axios
      .get(`${URL_SEARCHBYCATE}/${value}`)
      .then((res) => setgetDataSize(res.data))
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
                    Quản lý size
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
                <h4 className="card-title">Quản lý size</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form>
                    <Form.Group className="d-flex" controlId="formBasicEmail">
                      <Form.Select
                        value={filedSearches}
                        onChange={onChangeText}
                      >
                        <option>Tìm kiếm theo loại</option>
                        {category.map((val, key) => (
                          <option key={key} value={val.nameCate}>
                            {val.nameCate}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                  {/* <!-- Button trigger modal --> */}
                  <Button
                    variant="success"
                    onClick={() => handleShowModalAdd(0)}
                  >
                    Thêm size
                  </Button>
                </div>
                <br />
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Số size</th>
                        <th>Loại sản phẩm</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDataSize &&
                        getDataSize.map((value, inx) => (
                          <tr key={value._id}>
                            <td>{inx + 1}</td>
                            <td>{value.nameSize}</td>
                            <td>{value.cateProduct}</td>
                            <td>
                              &nbsp;
                              <DeleteIcon style={{ cursor: "pointer" }}
                                onClick={() => handleShowModalDelete(value._id)}
                              />
                              <Delete style={{ cursor: "pointer" }}
                                setshowDelete={showModalDelete}
                                handleCloseDelete={handleCloseModalDelete}
                                deleteUser={() => hanldeDeleteUser()}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateAndUpdateSize
        setShowModal={showModalAdd}
        setCloseModal={handleCloseModalAdd}
        setdataSize={setdataSize}
        dataSize={dataSize}
        getId={getID}
      />
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="#">
          B.N Shop
        </a>
        .
      </footer>
    </div>
  );
};

export default Size;
