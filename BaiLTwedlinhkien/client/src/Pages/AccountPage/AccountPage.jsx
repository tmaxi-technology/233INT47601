/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryBill from "./components/HistoryBill";
import Address from "./components/Address";
import axios from "axios";
import { HOST } from "../../Share/Domain/host";
import { CountContext } from "../../Context/CountContext";
const AccountPage = () => {
  const { reloadData } = useContext(CountContext);
  const idUser = sessionStorage.getItem("iduser");
  const [historyBill, setHistoryBill] = useState(false);
  const [isOpenAddress, setIsOpenAaddress] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [dataReceipt, setDataReceipt] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      !idUser &&
      currentPath !== "/account/login" &&
      currentPath !== "/account/register" &&
      currentPath === "/account"
    ) {
      // Nếu người dùng chưa đăng nhập thì sẽ chuyển hướng đến trang đăng nhập
      navigate("/account/login", { replace: true });
    } else {
      const getInfoUser = async () => {
        await axios
          .get(`${HOST}/users/${idUser}`)
          .then((res) => res.data)
          .then((data) => {
            if (data.success) {
              setDataUser(data.result);
            }
          });
      };
      getInfoUser();
    }
  }, [idUser, navigate, reloadData]);

  useEffect(() => {
    const getDataReceipt = async () => {
      await axios
        .get(`${HOST}/receipts?user_id=${dataUser.username}`)
        .then((res) => {
          setDataReceipt(res.data.results.list);
        })
    };
    getDataReceipt();
  },[dataUser])
  const handleLogOut = () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const handleOpenModalAddress = async () => {
    setIsOpenAaddress(!isOpenAddress);
  };
  return (
    <div className="container mx-auto text-black mb-12 py-7 px-4 space-y-4">
      <h1 className="text-center font-bold text-3xl relative">
        Tài khoản của bạn
        <span className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-14 h-1 bg-black"></span>
      </h1>
      <div className="flex lg:flex-row flex-col py-10">
        <div className="basis-1/4 space-y-2 pb-10">
          <h3 className="uppercase font-bold text-lg">Tài khoản</h3>
          <ul className="space-y-1 list-disc pl-5">
            <li>
              <a href="/account">Thông tin tài khoản</a>
            </li>
            <li>
              <button onClick={handleOpenModalAddress} className="text-black">
                Danh sách địa chỉ
              </button>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="text-black hover:text-blue-400"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
        <div className="basis-3/4 space-y-2">
          <h3 className="uppercase font-bold text-lg border-b">
            Tài khoản của bạn
          </h3>
          <ul className="space-y-1 ">
            <li>Tên người dùng: {dataUser.username}</li>
            <li>Email: {dataUser.email}</li>
            <li>Giới tính: {dataUser.gender}</li>
            <li>Sinh nhật: {dataUser.birth}</li>
            <li>
              <button
                onClick={handleOpenModalAddress}
                className="underline hover:text-blue-400 text-black"
              >
                Xem địa chỉ
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isOpenAddress && <Address infor={dataUser ?? ""} />}
      <div className="w-full lg:w-3/4 ml-auto space-y-4">
        <HistoryBill infor={dataReceipt}/>
      </div>
    </div>
  );
};

export default AccountPage;
