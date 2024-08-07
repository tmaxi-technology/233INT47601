import { useState, useEffect } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { formatNumberWithCommas } from "../../Share/utils";
import product from "../../assets/imgproduct.png";
import Carts from "../../API/carts";

// icons
import { AiOutlineUser } from "react-icons/ai";
import "./checkout.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Checkout = () => {
  const idUser = sessionStorage.getItem("iduser");
  const [errors, setErrors] = useState({});
  const [valueInput, setValueInput] = useState({});
  const [methodCheckout, setMethodCheckout] = useState("");
  const [dataCart, setDataCart] = useState([]);
  const [priceTotal, setPriceTotal] = useState("");
  const handleCheckValue = (e) => {
    const { value, name } = e.target;
    setValueInput((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const getCarts = async () => {
    try {
      const id_user = sessionStorage.getItem("iduser");
      //   const filter = `?user_id=${id_user}`;
      const response = await Carts.getAll(id_user);
      if (response.data.sucess) {
        // console.log('log', response.data);
        setDataCart(response.data.results.list);
        setPriceTotal(response.data.results.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = () => {
    try {
      const id_user = sessionStorage.getItem("iduser");
      axios.get(`http://localhost:1400/users/${id_user}`).then((res) => {
        if (res.data.success) {
          setValueInput(res.data.result);
        } else {
          setValueInput({});
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const clearCart = async (idUser) => {
    try {
      await Carts.clear(idUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
    getUser();
  }, []);

  const validateEmail = (email) => {
    const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{3})+$/;
    return validEmail.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;
    const error = {};

    if (!valueInput.email) {
      isValid = false;
      error.email = "Email không được để trống!";
    } else if (!validateEmail(valueInput.email)) {
      isValid = false;
      error.email = "Email không hợp lệ!";
    }

    if (!valueInput.address) {
      isValid = false;
      error.address = "Địa chỉ giao hàng không được để trống!";
    }

    if (!valueInput.username) {
      isValid = false;
      error.username = "Họ và Tên không được để trống!";
    }

    if (!valueInput.phone) {
      isValid = false;
      error.phone = "Số điện thoại giao hàng không được để trống!";
    }

    setErrors(error);
    return isValid;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const id_receipt = "HDMH" + Date.now();
    if (!validateForm()) {
      toast("Thanh toán thất bại", { type: "error" });
      return;
    }
    var currentDate = new Date();
    const dataRequest = {
      id: id_receipt,
      user_id: valueInput.username,
      payments_id: "CASH",
      address: valueInput.address,
      order_date: currentDate,
      delivery_date: currentDate.setDate(currentDate.getDate() + 4),
      note: "",
      status: "WAITING",
      payments_status: "WAITING",
      amount: parseInt(priceTotal) + 30000,
      phone: valueInput.phone,
      address: valueInput.address,
      email: valueInput.email,
    };
    if (!dataRequest.user_id || !dataRequest.address || !dataRequest.phone) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    
    for (let i = 0; i < dataCart.length; i++) {
      const name = dataCart[i].name;
      const quantity = dataCart[i].quantity;
      const dataProduct = {
        receipt_id: id_receipt,
        product_id: name,
        quantity: quantity,
        price: dataCart[i].amount
          ? parseInt(dataCart[i].amount)
          : parseInt(dataCart[i].price),
        total: dataCart[i].amount
          ? parseInt(dataCart[i].amount) * parseInt(dataCart[i].quantity)
          : parseInt(dataCart[i].price) * parseInt(dataCart[i].quantity),
      };
      // console.log("dataproduct", dataProduct);
      axios
        .post("http://localhost:1400/receipt_details", dataProduct)
        .then((res) => {});
    }
    // console.log("dataRequest", dataRequest);
    axios.post("http://localhost:1400/receipts", dataRequest).then((res) => {
      if (res.data.sucess) {
        toast("Thanh toán thành công", { type: "success" });
        clearCart(idUser);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    });
    return;
  };
  return (
    <div className="text-black">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="py-16 lg:pr-14 p-2 flex-grow-0 border-r md:basis-[60%] basis-auto bg-white">
          <div className="xl:ml-44 lg:ml-4 ml-0 xl:pl-20 lg:pl-2 pl-0">
            <h3 className="font-medium text-2xl text-center">
              B.N SHOP - Linh kiện điện tử
            </h3>
            <BreadCrumbs>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-black pr-2"
                    : "text-gray-500 pr-2"
                }
              >
                Trang chủ
              </Link>
              /
              <Link to="/cart" className="text-black pr-2">
                Giỏ hàng
              </Link>
              /<p>Thông tin giao hàng</p>
            </BreadCrumbs>
            <h4 className="py-4 text-xl font-bold">Thông tin giao hàng</h4>
          </div>
          <div className="xl:ml-44 lg:ml-4 ml-0 xl:pl-20 lg:pl-2 pl-0">
            <div className="flex flex-col">
              <div className="relative mt-4 mb-2">
                <label htmlFor="fullname">
                  <input
                    placeholder=" "
                    id="username"
                    name="username"
                    className="rounded-md form-input border w-full px-4 py-3 text-black"
                    onChange={handleCheckValue}
                    type="text"
                    value={valueInput.username ? valueInput.username : null}
                  />
                  <span
                    className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                  >
                    Họ và Tên
                  </span>
                </label>
              </div>
              {errors.username ? (
                <p className="text-red-600"> {errors.username} </p>
              ) : (
                ""
              )}

              <div className="relative mt-4 mb-2">
                <label htmlFor="email">
                  <input
                    placeholder=" "
                    id="email"
                    name="email"
                    className="rounded-md form-input border w-full px-4 py-3 text-black"
                    onChange={handleCheckValue}
                    type="text"
                    value={valueInput.email}
                  />
                  <span
                    className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                  >
                    Email
                  </span>
                </label>
              </div>
              {errors.email ? (
                <p className="text-red-600"> {errors.email} </p>
              ) : (
                ""
              )}

              <div className="relative mt-4 mb-2">
                <label htmlFor="phone">
                  <input
                    placeholder=" "
                    id="phone"
                    name="phone"
                    className="rounded-md form-input border w-full px-4 py-3 text-black"
                    onChange={handleCheckValue}
                    type="number"
                    value={valueInput.phone}
                  />
                  <span
                    className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                  >
                    Số điện thoại
                  </span>
                </label>
              </div>
              {errors.phone ? (
                <p className="text-red-600"> {errors.phone} </p>
              ) : (
                ""
              )}

              <div className="relative mt-4 mb-2">
                <label htmlFor="address">
                  <input
                    placeholder=" "
                    id="address"
                    name="address"
                    className="rounded-md form-input border w-full px-4 py-3 text-black"
                    onChange={handleCheckValue}
                    type="text"
                    value={valueInput.address}
                  />
                  <span
                    className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                  >
                    Địa chỉ
                  </span>
                </label>
              </div>
              {errors.address ? (
                <p className="text-red-600"> {errors.address} </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <h3 className="py-4 text-xl font-bold">Phương thức vận chuyển</h3>
              <div className="border rounded-sm p-5 flex justify-between items-center w-full">
                <p className="flex items-center gap-x-2">
                  <span
                    className="flex items-center relative h-5 w-5 bg-blue-500 
                      before:content-['']
                      before:absolute
                      before:top-1/2
                      before:left-1/2
                      before:-translate-x-1/2
                      before:-translate-y-1/2
                      before:h-1 
                      before:w-1
                      before:bg-white
                      before:rounded-full"
                  />
                  Giao hàng tận nơi
                </p>
                <span>30,000đ</span>
              </div>
            </div>
            <div>
              <h3 className="py-4 text-xl font-bold">Phương thức thanh toán</h3>
              <div>
                <ul>
                  <li className="relative border rounded-sm p-5 flex items-center w-full">
                    <input
                      name="option"
                      id="COD"
                      type="radio"
                      value={methodCheckout}
                      onChange={() => setMethodCheckout("COD")}
                      className="
                        w-5 h-5
                        appearance-none
                        ring-gray-300
                        rounded-sm
                        ring-1
                        hover:ring-blue-500 
                        checked:bg-blue-500 
                        bg-center
                        bg-no-repeat
                        bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')]
                        "
                    ></input>
                    <label htmlFor="COD" className="ml-3 cursor-pointer w-full">
                      <p>Thanh toán khi nhận hàng (COD)</p>
                    </label>
                  </li>
                  <li className="relative border border-t-0 rounded-sm p-5 flex items-center w-full">
                    <input
                      name="option"
                      id="banking"
                      type="radio"
                      value={methodCheckout}
                      onChange={() => setMethodCheckout("banking")}
                      className="
                          w-5 h-5
                          appearance-none
                          ring-gray-300
                          rounded-sm
                          ring-1
                          hover:ring-blue-500 
                          checked:bg-blue-500 
                          bg-center
                          bg-no-repeat
                          bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')]
                          "
                    ></input>
                    <label
                      htmlFor="banking"
                      className="ml-3 cursor-pointer w-full"
                    >
                      <p>Chuyển khoản qua ngân hàng</p>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:flex hidden md:flex-row flex-col gap-4 justify-between items-center mt-4">
              <button className="text-black md:text-left text-center px-4 py-3 md:order-1 order-2 w-full">
                <a href="/cart">Giỏ hàng</a>
              </button>
              <button
                onClick={handleCheckout}
                className="text-white md:order-2 order-1 px-4 py-3 bg-[#338dbc] w-full"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </div>
        </div>
        <div className="xl:border-l border-0 bg-[#f5f5f5] md:basis-[40%] basis-auto py-16 pl-10 w-full">
          <div className="xl:mr-44 lg:mr-4 mr-0 xl:pr-20 lg:pr-2 pr-0">
            {/* <div className="flex items-center gap-x-2 py-3 px-4 text-sm border-b-2">
              <p>{"1"}x</p>
              <div className="max-w-20 flex-shrink-0 flex-grow-0 basis-20 rounded-md">
                <img
                  src={product}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1">
                <p className="">
                  PC AAA 2K GAMING RADEON RX 6800 - 12400F (Toàn bộ linh kiện
                  ALL New - Bảo hành 36 tháng)
                </p>
              </div>
              <div className="space-y-2">28,490,000đ</div>
            </div> */}

            <div className="py-3">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="hidden">Mô tả</th>
                    <th className="hidden">giá</th>
                  </tr>
                </thead>
                <tbody className="space-y-2 border-b-2">
                  <tr className="flex justify-between items-center">
                    <td>Tạm tính</td>
                    <td>{formatNumberWithCommas(priceTotal)}đ</td>
                  </tr>
                  <tr className="flex justify-between items-center pb-2">
                    <td>Phí vận chuyển</td>
                    <td>30,000đ</td>
                  </tr>
                </tbody>
                <tfoot className="">
                  <tr className="flex justify-between items-center pt-2">
                    <td>Tổng cộng</td>
                    <td className="text-2xl it items-center flex gap-x-2 font-semibold">
                      <span className="text-base">VND</span>{" "}
                      {formatNumberWithCommas(parseInt(priceTotal) + 30000)}đ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:hidden flex md:flex-row flex-col gap-4 justify-between items-center mt-4">
          <button className="text-black md:text-left text-center px-4 py-3 md:order-1 order-2 w-full">
            <a href="/cart">Giỏ hàng</a>
          </button>
          <button
            onClick={handleCheckout}
            className="text-white md:order-2 order-1 px-4 py-3 bg-[#338dbc] w-full"
          >
            Hoàn tất đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
