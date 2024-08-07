/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { HOST } from "../../../Share/Domain/host";
import { CountContext } from "../../../Context/CountContext";
const EditProfileUser = ({ onClose, infor }) => {
  const { updateDataUser } = useContext(CountContext);
  const [valueInput, setValueInput] = useState({});
  const [errors, setErrors] = useState({});
  const idUser = sessionStorage.getItem("iduser") ?? "";

  useEffect(() => {
    const getInfoUser = async () => {
      await axios
        .get(`${HOST}/users/${idUser}`)
        .then((res) => res.data)
        .then((data) => {
          if (data.success) {
            setValueInput(data.result);
          }
        });
    };
    getInfoUser();  
  },[])
  const validateForm = () => {
    let isValid = true;
    const error = {};

    if (!valueInput.username) {
      isValid = false;
      error.username = "Họ và Tên không được để trống!";
    }

    if (!valueInput.phone) {
      isValid = false;
      error.phone = "SDT không được để trống!";
    }

    if (!valueInput.gender) {
      isValid = false;
      error.gender = "Giới tính không được để trống!";
    }

    if (!valueInput.birth) {
      isValid = false;
      error.birth = "Sinh nhật không được để trống!";
    }

    if (!valueInput.address) {
      isValid = false;
      error.address = "Địa chỉ giao hàng không được để trống!";
    }

    setErrors(error);
    return isValid;
  };

  const handleCheckValue = (e) => {
    const { value, name } = e.target;
    setValueInput((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        username: valueInput.username,
        gender: valueInput.gender,
        birth: valueInput.birth,
        address: valueInput.address,
        phone: valueInput.phone,
      };
      // console.log('data',data);
      await axios
        .put(`${HOST}/users/${idUser}`, data)
        .then((res) => res.data)
        .then((data) => {
          if (data.success) {
            toast(data.mes, { type: "success" });
            onClose();
            updateDataUser();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            toast(data.mes, { type: "error" });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="fixed h-full w-full top-0 left-0 z-50 flex justify-center items-center">
      <div className=" lg:w-[500px] w-full bg-white text-black p-5 rounded-md shadow-md mx-2">
        <div className="font-bold text-xl header-modal flex justify-between items-center border-b border-gray-400">
          Chỉnh sửa thông tin
          <button
            onClick={onClose}
            className="hover:text-2xl text-black text-xl hover:rotate-90 hover:text-[--header-text-danger] transition-all duration-300 ease-linear"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="body-modal py-4">
          <div className="flex flex-col">
            <div className="relative mt-4 mb-2">
              <label htmlFor="fullname">
                <input
                  id="fullname"
                  name="fullName"
                  className="rounded-md focus:outline-none form-input border w-full px-4 py-3 text-black"
                  onChange={(e) =>
                    setValueInput({ ...valueInput, username: e.target.value })
                  }
                  type="text"
                  value={
                    valueInput.username
                  }
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
              <label htmlFor="phone">
                <input
                  placeholder=" "
                  id="phone"
                  name="phone"
                  className="rounded-md focus:outline-none form-input border w-full px-4 py-3 text-black"
                  onChange={handleCheckValue}
                  type="text"
                  value={valueInput.phone}
                />
                <span
                  className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                >
                  Số điện thoại
                </span>
              </label>
            </div>
            {errors.phone ? (
              <p className="text-red-600"> {errors.phone} </p>
            ) : (
              ""
            )}

            <div className="relative mt-4 mb-2">
              <label htmlFor="gender">
                <input
                  placeholder=" "
                  id="gender"
                  name="gender"
                  className="rounded-md focus:outline-none form-input border w-full px-4 py-3 text-black"
                  onChange={handleCheckValue}
                  type="text"
                  value={valueInput.gender}
                />
                <span
                  className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                >
                  Giới tính
                </span>
              </label>
            </div>
            {errors.gender ? (
              <p className="text-red-600"> {errors.gender} </p>
            ) : (
              ""
            )}

            <div className="relative mt-4 mb-2">
              <label htmlFor="birthday">
                <input
                  placeholder=" "
                  id="birthday"
                  name="birthday"
                  className="rounded-md focus:outline-none form-input border w-full px-4 py-3 text-black"
                  onChange={handleCheckValue}
                  type="date"
                  value={
                    valueInput.birth
                  }
                />
                <span
                  className={`select-none transition-all ease-linear text-[--colorTextLight] absolute left-4 top-1/2 -translate-y-1/2 form-label`}
                >
                  Sinh nhật
                </span>
              </label>
            </div>
            {errors.birth ? (
              <p className="text-red-600"> {errors.birth} </p>
            ) : (
              ""
            )}

            <div className="relative mt-4 mb-2">
              <label htmlFor="address">
                <input
                  placeholder=" "
                  id="address"
                  name="address"
                  className="rounded-md focus:outline-none form-input border w-full px-4 py-3 text-black"
                  onChange={handleCheckValue}
                  type="text"
                  value={
                    valueInput.address
                  }
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
        </div>
        <div className="footer-modal flex justify-between items-center gap-2 flex-col lg:flex-row border-t border-gray-400 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-black hover:bg-gray-100 border border-black w-full rounded-md"
          >
            Thoát
          </button>
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white outline-none w-full rounded-md"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileUser;
