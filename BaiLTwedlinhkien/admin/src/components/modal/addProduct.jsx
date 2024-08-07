import React, { useState } from "react";
import axios from "axios";

import FileBase64 from "react-file-base64";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { HOST } from "../../domain/host/host";

const AddProduct = () => {
  const URL_ADDPRODUCT = `${HOST}/products/create`;
  const [dataProduct, setDataProduct] = useState({
    name: "",
    price: "",
    img4: "abc",
    img1: "abc",
    img2: "abc",
    img3: "abc",
    category: "",
    size: "",
    SKU: "",
    description: "",
    sale: "",
    reducedPrice: "",
  });
  const [inputFile, setInputFile] = useState("")

  const onSubmit = async () => {
    await axios.post(
      `${URL_ADDPRODUCT}`, dataProduct
    );
    alertify.set("notifier", "position", "top-right");
    alertify.success("Bạn Đã thêm User Thành Công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };

  const chooseFile = (inputFile) => {
    if(inputFile.files && inputFile.files[0]){
        var reader = new FileReader();

        reader.onload = function(e) {
          // $('#images').attr('src', e.target.result);
          setInputFile(e.target.result)
        }
        reader.readAsDataURL(inputFile.files[0])
    }
  }
  return (
    //   {/* <!-- Modal --> */}
    <div
      className="modal fade bd-example-modal-lg"
      id="addProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
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
                <label for="exampleInputEmail1">Tên sản phẩm</label>
                <input
                  type="nameProduct"
                  className="form-control"
                  id="nameProduct"
                  placeholder="Tên sản phẩm"
                  value={dataProduct.name}
                  onChange={(e) =>
                    setDataProduct({
                      ...dataProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Giá</label>
                <input
                  type="price"
                  className="form-control"
                  id="price"
                  placeholder="Giá"
                  value={dataProduct.price}
                  onChange={(e) =>
                    setDataProduct({ ...dataProduct, price: e.target.value })
                  }
                />
              </div>

              <div className="form-check-inline">
                <div className="form-group">
                  <label for="exampleFormControlFile1">
                    Hình đại diện sản phẩm
                  </label>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    className="form-control-file"
                    id="image"
                    value={dataProduct.img1}
                    onDone={({ base64 }) =>
                      setDataProduct({ ...dataProduct, img1: base64 })
                    }
                  />
                </div>

                <div className="form-group">
                  <label for="exampleFormControlFile1">Ảnh 1</label>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    className="form-control-file"
                    id="image"
                    value={dataProduct.img2}
                    onDone={({ base64 }) =>
                      setDataProduct({ ...dataProduct, img2: base64 })
                    }
                  />
                </div>
              </div>

              <div className="form-check-inline">
                <div className="form-group">
                  <label for="exampleFormControlFile1">Ảnh 2</label>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    className="form-control-file"
                    id="image"
                    value={dataProduct.img3}
                    onDone={({ base64 }) =>
                      setDataProduct({ ...dataProduct, img3: base64 })
                    }
                  />
                </div>

                <div className="form-group">
                  <label for="exampleFormControlFile1">Ảnh 3</label>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    className="form-control-file"
                    id="image"
                    value={dataProduct.img4}
                    onDone={({ base64 }) =>
                      setDataProduct({ ...dataProduct, img4: base64 })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Danh mục</label>
                <input
                  type="category"
                  className="form-control"
                  id="category"
                  placeholder="Danh mục"
                  value={dataProduct.category}
                  onChange={(e) =>
                    setDataProduct({ ...dataProduct, category: e.target.value })
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

export default AddProduct;
