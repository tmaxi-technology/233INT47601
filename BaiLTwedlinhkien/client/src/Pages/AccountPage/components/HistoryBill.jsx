/* eslint-disable no-unused-vars */
import { FaShippingFast, FaStore, FaSyncAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../../../Share/Domain/host";
import { formatNumberWithCommas } from "../../../Share/utils";
const HistoryBill = ({ infor }) => {
  const [modalShowDetailInvoices, setModalShowDetailInvoices] = useState(false);
  const [modalShowFormCancelOrder, setModalShowFormCancelOrder] =
    useState(false);
  const [idCancelOrder, setIdCancelOrder] = useState("");
  const [historyBill, setHistoryBill] = useState(false);
  const iduser = sessionStorage.getItem("iduser");

  useEffect(() => {
    if (infor) {
      setHistoryBill(true);
    }
  });

  const handleShowDetailInvoices = (id) => {
    setModalShowDetailInvoices(true);
  };

  const handleShowFormCancelOrder = (id) => {
    setIdCancelOrder(id);
    setModalShowFormCancelOrder(true);
  };

  const handleDoneOrder = async (id) => {
    // const data = {
    //     status: "Hoàn thành"
    // }
    // try {
    //     if (data !== null) {
    //         await axios.put(`${URL_CANCELORDER}/${id}`, data)
    //         setTimeout(function () {
    //             setModalShowFormCancelOrder(false)
    //             setReloadData(!reloadData)
    //         }, 1000);
    //         return
    //     }
    // } catch (error) {
    //     return error
    // }
  };
  return (
    <>
      {historyBill ? (
        infor.map((val) => (
          <div className="rounded-lg bg-white py-5 px-7 shadow border-8 border-[#d9edf7]">
            <div className="flex items-center">
              <FaStore className="mr-2" />
              <span>B.N SHOP</span>
            </div>
            <div className="pt-5 flex flex-col">
              <div className="border-b flex justify-between lg:items-center items-start flex-col lg:flex-row ">
                <div className="mb-3 lg:mb-0">
                  <p>Mã đơn hàng: {val.id}</p>
                </div>
              </div>
              <div className="flex lg:items-center items-start lg:flex-row flex-col justify-between py-3 border-b">
                <div>
                  <p>
                    Người nhận:<b className=""> {val.user_id}</b>
                  </p>
                  <p>
                    Tổng sản phẩm:<b className=""> {"1"}</b>
                  </p>
                  <p>
                    SDT:
                    <b className=""> {val.phone}</b>
                  </p>
                </div>
                <div>
                  <p>
                    Ngày mua:<b className=""> {val.order_date}</b>
                  </p>
                </div>
              </div>
              <div className="footer-order flex flex-col items-end py-3">
                <p className="text-base">
                  Tổng đơn:{" "}
                  <b className="">{formatNumberWithCommas(val.amount)}₫</b>
                </p>
                <div className="flex lg:flex-row flex-col items-end h-full w-full gap-4">
                  {status === "Đã hủy" ? (
                    <button
                      onClick={() => handleShowDetailInvoices("val.id")}
                      className="transition-all duration-300 ease-linear rounded-md w-full bg-[#efb93b] hover:text-white text-black py-3 px-2 mt-3"
                    >
                      Chi Tiết Đơn Hủy
                    </button>
                  ) : (
                    <button
                      onClick={() => handleShowDetailInvoices("val.id")}
                      className="transition-all duration-300 ease-linear rounded-md w-full bg-[#efb93b] hover:text-white text-black py-3 px-2 mt-3"
                    >
                      Chi Tiết Đơn Hàng
                    </button>
                  )}
                  {/* Modal thông tin hóa đơn */}
                  {/* {modalShowDetailInvoices &&
                    getDataInvoices.imgProduct !== "" && (
                      <DetailInvoices
                        show={modalShowDetailInvoices}
                        onHide={() => setModalShowDetailInvoices(false)}
                        datainvoices={getDataInvoices}
                      />
                    )} */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-2 py-3 bg-white">
          <p>Bạn chưa đặt mua sản phẩm nào.</p>
        </div>
      )}
    </>
  );
};

export default HistoryBill;
