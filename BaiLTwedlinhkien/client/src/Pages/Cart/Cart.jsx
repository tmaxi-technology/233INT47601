/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Link } from "react-router-dom";
import ProductCart from "./components/ProductCart";
import Carts from "../../API/carts";
import { formatNumberWithCommas} from "../../Share/utils";
const Cart = () => {
  const hanldeCheckout = () => {
    window.location.href = "/checkout";
  };
  const [dataCart, setDataCart] = useState([]);
  const [price, setPrice] = useState("");

  const getCarts = async () => {
    try {
      const id_user = sessionStorage.getItem("iduser");
      const response = await Carts.getAll(id_user);
      if (response.data.sucess) {
        setDataCart(response.data.results.list);
        setPrice(response.data.results.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);
  return (
    <>
      <BreadCrumbs>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "text-black pr-2" : "text-gray-500 pr-2"
          }
        >
          Trang chủ
        </Link>
        /
        <p className="text-black pr-2">
          Giỏ hàng({dataCart ? dataCart.length : ""})
        </p>
      </BreadCrumbs>
      <div className="container mx-auto text-black p-2">
        <div className="flex lg:flex-row flex-col gap-4 relative">
          <div className="bg-white rounded-md">
            <h3 className="border-b py-2 px-4 font-semibold text-lg">
              Giỏ hàng của bạn
            </h3>
            <div className="px-4">
              <p className="py-4">
                Bạn đang có <b>{dataCart ? dataCart.length : 0} sản phẩm</b>{" "}
                trong giỏ hàng
              </p>
              {dataCart && dataCart.length > 0 ? (
                dataCart.map((val, key) => <ProductCart key={key} data={val} />)
              ) : (
                <div>
                  Bạn chưa thêm sản phẩm nào vào giỏ hàng.{" "}
                  <a
                    href="/collections/all"
                    className="text-[--brow] font-medium"
                  >
                    Đến trang sản phẩm
                  </a>{" "}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-md h-max sticky top-40 right-0">
            <h3 className="border-b py-2 px-4 font-semibold text-lg">
              Thông tin đơn hàng
            </h3>
            <div className="border-b p-4 flex justify-between items-center text-base">
              <b>Tổng tiền:</b>{" "}
              <span className="text-lg font-bold text-[#e70505]">{formatNumberWithCommas(price)}đ</span>
            </div>
            <ul className="ml-4 p-4 list-disc">
              <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
              <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
              <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
            </ul>
            <div className="w-full pb-4 px-4">
              <button
                onClick={hanldeCheckout}
                className="w-full py-2 rounded-md font-semibold text-lg border bg-[#e70505] border-[#ff0000] text-white uppercase"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
