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

import CateAPI from "../../../API/cate";
import CouponAPI from "../../../API/coupon";

const CreateAndUpdate = (props) => {
  const URL_GETBRAND = `${HOST}/provider?limit=100`;
  const URL_GETTYPE = `${HOST}/type?limit=100`;

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [type, setType] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [getSize, setGetSize] = useState([]);
  const [checkSize, setCheckSize] = useState([]);

  const dataProduct = props.dataProduct;
  const setDataProduct = props.setDataProduct;
  const getId = props.getId;
  var album;
  var size;

  const [imageUpload, setImageUpload] = useState("");
  const [albumUpload, setAlbumUpload] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListCateApi = async (filter = null) => {
    let response;
    if (filter) {
      response = await CateAPI.getAll(filter);
    } else {
      response = await CateAPI.getAll();
    }
    const data = response.data.results.list;
    setCategory(data);
    const results = response.data.results;
  };

  const getListCouponApi = async (filter = null) => {
    let response;
    if (filter) {
      response = await CouponAPI.getAll(filter);
    } else {
      response = await CouponAPI.getAll();
    }
    const data = response.data.results.list;
    setCoupons(data);
    const results = response.data.results;
  };

  const onChangeAvatarProduct = (e) => {
    setImageUpload(e.target.files[0]);
  };
  const onChangeAlbumProduct = (e) => {
    setAlbumUpload(Array.from(e.target.files));
  };

  useEffect(() => {
    const upLoadSingleImage = async () => {
      if (imageUpload) {
        const formData = new FormData();
        formData.append("image", imageUpload);
        setLoading(!loading);
        try {
          const response = await axios.post(`${HOST}/upload-cloud`, formData, {
            // headers: {
            //   "Content-Type": "multipart/form-data",
            // },
          });
          dataProduct.image = response.data.img;
          setLoading(false);
        } catch (err) {
          console.error("err upload single image", err);
        }
      }
    };
    upLoadSingleImage();
    // const upLoadMultipleImages = async () => {
    //   if (albumUpload.length > 0) {
    //     const formData = new FormData();
    //     albumUpload.forEach((file) => {
    //       formData.append("files", file);
    //     });
    //     setLoading(!loading);
    //     try {
    //       const response = await axios.post(
    //         `${HOST}/upload-multiple`,
    //         formData
    //       );
    //       dataProduct.album = response.data.album.join(" ");
    //       setLoading(false);
    //     } catch (error) {
    //       console.log("error upload multiple images", error);
    //     }
    //   }
    // };
    // upLoadMultipleImages();
  }, [imageUpload]);

  const onSubmit = async (id) => {
    const URL_PRODUCT = `${HOST}/product`;
    if (id) {
      await axios
        .put(`${URL_PRODUCT}/${id}`, dataProduct)
        .then((res) => console.log("res", res))
        .catch((err) => console.error("err", err));
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã update sản phẩm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      await axios.post(`${URL_PRODUCT}`, dataProduct);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn đã thêm sản phẩm thành công!");
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

  // lấy category & brabd & coupons & size
  useEffect(() => {
    getListCateApi();
    getListCouponApi();
    axios
      .get(URL_GETBRAND)
      .then((res) => setBrand(res.data.results.list))
      .catch((err) => console.log(err));
    axios
      .get(URL_GETTYPE)
      .then((res) => setType(res.data.results.list))
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

  const selectVoucher = coupons.filter((val) => {
    if (dataProduct.coupon_id) {
      return parseInt(dataProduct.coupon_id) === parseInt(val.id);
    }
    return null;
  });
  const promotionPrice =
    selectVoucher.length === 0 ? null : selectVoucher.map((val) => val.percent);
  const percent = !promotionPrice ? null : promotionPrice.toString();

  const promotion = percent
    ? parseInt(dataProduct.price) -
      (parseInt(dataProduct.price) * parseInt(percent)) / 100
    : null;
  dataProduct.amount = !promotion ? null : String(promotion);
  return (
    <Modal
      show={props.setShowModal}
      onHide={props.setCloseModal}
      fullscreen={true}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phảm mới</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* tên san phẩm  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
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
                  value={dataProduct.category_id}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      category_id: e.target.value,
                    })
                  }
                >
                  <option>Loại sản phẩm</option>
                  {category.map((val, key) => (
                    <option key={key} value={val.id}>
                      {val.name}
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
                  value={parseInt(
                    percent
                      ? dataProduct.price - (dataProduct.price * percent) / 100
                      : dataProduct.amount
                  ).toLocaleString()}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Coupons (%)</Form.Label>
                <Form.Select
                  value={dataProduct.coupon_id}
                  onChange={(e) => {
                    setDataProduct({
                      ...dataProduct,
                      coupon_id: e.target.value === "0" ? null : e.target.value,
                      amount: promotion,
                    });
                  }}
                >
                  <option value="0">Coupons</option>
                  {coupons.map((val, key) => (
                    <option key={key} value={val.id}>
                      {val.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>CTKM</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Bestseler"
                  value="1"
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
                        bestseller: null,
                      });
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
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
          {/* provider_id & reviews  & size*/}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Thương hiệu</Form.Label>
                <br />
                <Form.Select
                  value={dataProduct.provider_id}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      provider_id: e.target.value,
                    })
                  }
                >
                  <option>Thương hiệu</option>
                  {brand.map((val, key) => (
                    <option key={key} value={val.id}>
                      {val.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>product type</Form.Label>
                <br />
                <Form.Select
                  value={dataProduct.product_type_id}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      product_type_id: e.target.value,
                    })
                  }
                >
                  <option>product type</option>
                  {type.map((val, key) => (
                    <option key={key} value={val.id}>
                      {val.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* ảnh sản phẩm  */}
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Ảnh đại diện sản phẩm</Form.Label>
                <input type="file" onChange={onChangeAvatarProduct} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <img
                  style={{ height: "30%", width: "30%" }}
                  src={
                    dataProduct.image
                      ? dataProduct.image
                      : "https://media.istockphoto.com/id/1180410233/vi/vec-to/m%C3%A1y-%E1%BA%A3nh-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%E1%BA%A3nh-nhi%E1%BA%BFp-%E1%BA%A3nh-vector-m%C3%A1y-%E1%BA%A3nh-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%C3%ACnh-%E1%BA%A3nh.jpg?s=170x170&k=20&c=0blfZIrXLdoafOdjQ5Pr5IA0rkBbgSi4Y4Meuyjv-VQ="
                  }
                  alt=""
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Mô tả */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
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
        {/* loading */}
        {!loading ? (
          <Button variant="primary" onClick={() => onSubmit(getId)}>
            Lưu thay đổi
          </Button>
        ) : (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAndUpdate;
