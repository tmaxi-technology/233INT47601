import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Modal from "react-bootstrap/Modal";
import { HOST } from "../../../domain/host/host";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import FileBase64 from "react-file-base64";

const View = (props) => {
  const URL_GETCATEGORY = `${HOST}/categories`;
  const URL_GETBRAND = `${HOST}/brand`;
  const URL_GETCOUPONS = `${HOST}/coupons`;
  const URL_GETSIZE = `${HOST}/size`;
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [getSize, setGetSize] = useState([]);
  const [checkSize, setCheckSize] = useState([]);

  const dataProduct = props.dataProduct;
  const setDataProduct = props.setDataProduct;
  const album = dataProduct.album.split(" ");
  const size = dataProduct.size.split(" ");

  const getFilesimg = (files) => {
    let base64 = files.map((val) => {
      return val.base64;
    });
    setDataProduct({ ...dataProduct, album: base64.join(" ") });
  };

  // lấy category & brabd & coupons & size
  useEffect(() => {
    axios
      .get(URL_GETCATEGORY)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
    axios
      .get(URL_GETBRAND)
      .then((res) => setBrand(res.data))
      .catch((err) => console.log(err));
    axios
      .get(URL_GETCOUPONS)
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log(err));
    axios
      .get(URL_GETSIZE)
      .then((res) => setGetSize(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setCheckSize((pre) => [...pre, value]);
    } else {
      setCheckSize((pre) => {
        return [...pre.filter((skill) => skill !== value)];
      });
    }
  }
  const CateChecked = dataProduct.category;
  const getSizeByCate = getSize.filter((el) => {
    if (CateChecked && CateChecked === el.cateProduct) return el.nameSize;
  });
  const selectSizeByCate = getSizeByCate.map((val) => val.nameSize);
  const checkedSizes = selectSizeByCate.map((val) => {
    if (size.includes(val)) {
      return { value: val, checked: true };
    } else {
      return { value: val, checked: false };
    }
  });

  useEffect(() => {
    setDataProduct({
      ...dataProduct,
      size: checkSize.join(" "),
    });
  }, [checkSize]);

  const selectVoucher = coupons.filter(
    (val) => dataProduct.coupons === val.nameCoupons
  );
  const promotionPrice = selectVoucher.map((val) => val.voucher);
  const percent = promotionPrice.toString();
  return (
    <Modal
      show={props.showModalView}
      onHide={props.setCloseModal}
      fullscreen={true}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* tên san phẩm  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Tên sản phẩm"
              value={dataProduct.name}
              onChange={(e) =>
                setDataProduct({ ...dataProduct, name: e.target.value })
              }
            />
            {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
          </Form.Group>
          {/* Giá & loại */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Giá sản phẩm</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Giá sản phẩm"
                  value={dataProduct.price}
                  onChange={(e) =>
                    setDataProduct({ ...dataProduct, price: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Loại sản phẩm</Form.Label>
                <br />
                <Form.Select
                  disabled
                  value={dataProduct.category}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Loại sản phẩm</option>
                  {category.map((val, key) => (
                    <option key={key} value={val.nameCate}>
                      {val.nameCate}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* coupons & diskCount & CTKM & SL */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Giá giảm</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Giá sản phẩm"
                  value={
                    percent
                      ? dataProduct.price - (dataProduct.price * percent) / 100
                      : dataProduct.promotionPrice
                  }
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      promotionPrice: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Coupons (%)</Form.Label>
                <Form.Select
                  disabled
                  value={dataProduct.coupons}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      coupons: e.target.value,
                    })
                  }
                >
                  <option>Coupons</option>
                  {coupons.map((val, key) => (
                    <option key={key} value={val.nameCoupons}>
                      {val.nameCoupons}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>CTKM</Form.Label>
                <Row>
                  <Col>
                    <Form.Check
                      disabled
                      type="checkbox"
                      label="Featured"
                      value="featured"
                      checked={dataProduct.featured ? true : false}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setDataProduct({
                            ...dataProduct,
                            featured: value,
                          });
                        } else {
                          setDataProduct({
                            ...dataProduct,
                            featured: "",
                          });
                        }
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      disabled
                      type="checkbox"
                      label="Bestseler"
                      value="bestseller"
                      checked={dataProduct.bestseller ? true : false}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setDataProduct({
                            ...dataProduct,
                            bestseller: value,
                          });
                        } else {
                          setDataProduct({
                            ...dataProduct,
                            bestseller: "",
                          });
                        }
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      disabled
                      type="checkbox"
                      label="HotDeals"
                      value="hotdeals"
                      checked={dataProduct.hotdeals ? true : false}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          setDataProduct({
                            ...dataProduct,
                            hotdeals: value,
                          });
                        } else {
                          setDataProduct({
                            ...dataProduct,
                            hotdeals: "",
                          });
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  disabled
                  type="number"
                  placeholder="Số lượng"
                  value={dataProduct.quantity}
                  onChange={(e) =>
                    setDataProduct({ ...dataProduct, quantity: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {/* brand & reviews  & size*/}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Thương hiệu</Form.Label>
                <br />
                <Form.Select
                  disabled
                  value={dataProduct.brand}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      brand: e.target.value,
                    })
                  }
                >
                  <option>Thương hiệu</option>
                  {brand.map((val, key) => (
                    <option key={key} value={val.nameBrand}>
                      {val.nameBrand}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Đánh giá</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder="Đánh giá"
                    value={dataProduct.reviews}
                    onChange={(e) =>
                      setDataProduct({
                        ...dataProduct,
                        reviews: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Size sản phẩm</Form.Label>
                <Row>
                  {selectSizeByCate.length !== 0 ? (
                    checkedSizes.map((val, key) => (
                      <Col>
                        <Form.Check
                          disabled
                          key={key}
                          type="checkbox"
                          label={val.value}
                          value={val.value}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          checked={val.checked}
                        />
                      </Col>
                    ))
                  ) : (
                    <Form.Text className="text-muted">
                      Vui lòng chọn loại sản phẩm!
                    </Form.Text>
                  )}
                </Row>
              </Form.Group>
            </Col>
          </Row>
          {/* ảnh sản phẩm  */}
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Ảnh đại diện sản phẩm</Form.Label>
                {/* <Form.Control type="file" /> */}
                <FileBase64
                  disabled
                  accept="image/*"
                  multiple={false}
                  type="file"
                  className="form-control-file"
                  id="image"
                  value={dataProduct.avt}
                  onDone={({ base64 }) =>
                    setDataProduct({ ...dataProduct, avt: base64 })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <img
                  style={{ height: "30%", width: "30%" }}
                  src={
                    dataProduct.avt
                      ? dataProduct.avt
                      : "https://media.istockphoto.com/id/1180410233/vi/vec-to/m%C3%A1y-%E1%BA%A3nh-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%E1%BA%A3nh-nhi%E1%BA%BFp-%E1%BA%A3nh-vector-m%C3%A1y-%E1%BA%A3nh-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%C3%ACnh-%E1%BA%A3nh.jpg?s=170x170&k=20&c=0blfZIrXLdoafOdjQ5Pr5IA0rkBbgSi4Y4Meuyjv-VQ="
                  }
                  alt=""
                />
              </Form.Group>
            </Col>
          </Row>
          {/* album sản phẩm  */}
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Album sản phẩm</Form.Label>
                <FileBase64
                  disabled
                  multiple={true}
                  className="form-control-file"
                  value={dataProduct.album}
                  onDone={getFilesimg.bind(this)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                {album && (
                  album.map((val, idx) => (
                    <img
                      key={idx + 1}
                      style={{ height: "10%", width: "10%" }}
                      src={val
                        ? val
                        : "https://media.istockphoto.com/id/1180410233/vi/vec-to/m%C3%A1y-%E1%BA%A3nh-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%E1%BA%A3nh-nhi%E1%BA%BFp-%E1%BA%A3nh-vector-m%C3%A1y-%E1%BA%A3nh-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%C3%ACnh-%E1%BA%A3nh.jpg?s=170x170&k=20&c=0blfZIrXLdoafOdjQ5Pr5IA0rkBbgSi4Y4Meuyjv-VQ="
                      }
                      alt=""
                    />
                  ))
                )}
              </Form.Group>
            </Col>
          </Row>
          {/* Mô tả */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              disabled
              rows={15}
              as="textarea"
              placeholder="Hãy để lại mô tả sản phẩm ở đây!"
              value={dataProduct.description}
              onChange={(e) =>
                setDataProduct({
                  ...dataProduct,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
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
