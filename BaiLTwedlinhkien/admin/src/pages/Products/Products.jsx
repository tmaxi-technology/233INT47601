import React, { useEffect, useState } from "react";
import axios from "axios";

import Delete from "../../components/modal/delete";
import CreateAndUpdate from "./Component/createAndUpdate";
import { HOST } from "../../domain/host/host";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import queryString from "query-string";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import View from "./Component/view";

import { Add } from "@mui/icons-material";

import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ProductAPI from "../../API/product";
import Pagination from "@mui/material/Pagination";
function Products(props) {
  const URL_DELETEPRODUCT = `${HOST}/product`;
  const URL_PRODUCTS = `${HOST}/product`;
  const URL_PRODUCT = `${HOST}/product`;
  const URL_SEARCHPRODUCT = `${HOST}/search`;

  const [products, setProducts] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [getID, setgetID] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPagination] = useState({});
  const [dataProduct, setDataProduct] = useState({
    code: null,
    name: null,
    description: null,
    price: null,
    amount: null,
    quantity: null,
    image: null,
    status: null,
    bestseller: null,
    display: null,
    slug: null,
    product_type_id: null,
    coupon_id: null,
    category_id: null,
    provider_id: null,
  });
  const [filedSearches, setFiledSearches] = useState("");
  const getListProductApi = async (filter = null) => {
    let response;
    if (filter) {
      response = await ProductAPI.getAll(filter);
    } else {
      response = await ProductAPI.getAll();
    }
    const data = response.data.results.list;
    setProducts(data);
    const results = response.data.results;
    const page = Math.ceil(results.total / results.limit);
    setPagination({
      page: page,
      total: results.total,
      limit: results.limit,
      offset: results.offset,
    });
  };

  const getAPIById = async (id) => {
    const response = await ProductAPI.getById(id);
    if (response.data.sucess) {
      setDataProduct(response.data.result);
    }
  };

  const deleteDataAPI = async (id) => {
    const response = await ProductAPI.delete(id);
    if (response.data.sucess) {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Đã xoá sản phẩm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

  //add & update product
  const handleShowModalAdd = (id) => {
    if (id !== 0) {
      setgetID(id);
      getAPIById(id);
    }
    setShowModalAdd(true);
  };
  const handleCloseModalAdd = () => setShowModalAdd(false);

  useEffect(() => {
    getListProductApi();
  }, []);

  // đóng modal delete
  const handleCloseModalDelete = () => setShowModalDelete(false);
  // show modal delete
  const handleShowModalDelete = (id) => {
    setgetID(id);
    setShowModalDelete(true);
  };
  // xử lý delete product
  const hanldeDelete = async () => {
    deleteDataAPI(getID);
  };

  const onChangeText = (e) => {
    const value = e.target.value;
    const dataFilded = {
      fildter: filedSearches,
      value: value,
    };
    if (dataFilded.fildter === "") {
      dataFilded.fildter = "name";
    }
    const query = "?" + queryString.stringify(dataFilded);
    if (!value) {
      getListProductApi();
      return;
    }
    axios
      .get(`${URL_SEARCHPRODUCT}${query}`)
      .then((res) => setProducts(res.data.result))
      .catch((err) => console.error("err", err.response));
  };

  const handleChange = (e, p) => {
    const offset = (p - 1) * pagination.limit;
    const filter = `?offset=${offset}`;
    getListProductApi(filter);
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
                    Quản lý sản phẩm
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
                <h4 className="card-title">Quản lý sản phẩm</h4>
                <div className="col d-flex justify-content-between">
                  <Form action="" style={{ display: "flex" }}>
                    <InputGroup className="mb-3">
                      <Form.Select
                        value={filedSearches}
                        onChange={(e) => setFiledSearches(e.target.value)}
                      >
                        <option value="name">Tên sản phẩm</option>
                        <option value="category">Loại sản phẩm</option>
                        <option value="brand">thương hiệu</option>
                      </Form.Select>
                      <Form.Control
                        className="w-50"
                        placeholder="Tìm kiếm"
                        onChange={onChangeText}
                      />
                    </InputGroup>
                  </Form>
                  <Button variant="light" onClick={() => handleShowModalAdd(0)}>
                    <Add fontSize="large" />
                  </Button>
                </div>
                <br />
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th>Tuỳ chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value, inx) => (
                          <tr key={value._id}>
                            <td>{inx + 1}</td>
                            <td>{value.name}</td>
                            <td>{parseInt(value.price).toLocaleString()}₫</td>
                            <td>
                              <img
                                src={value.image}
                                style={{ height: "60px", width: "60px" }}
                                alt=""
                              />
                            </td>
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
                              &nbsp;
                              <Delete
                                setshowDelete={showModalDelete}
                                handleCloseDelete={handleCloseModalDelete}
                                deleteUser={() => hanldeDelete()}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    count={pagination.page}
                    onChange={handleChange}
                  />
                  <CreateAndUpdate
                    setShowModal={showModalAdd}
                    setCloseModal={handleCloseModalAdd}
                    setDataProduct={setDataProduct}
                    dataProduct={dataProduct}
                    getId={getID}
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

export default Products;
