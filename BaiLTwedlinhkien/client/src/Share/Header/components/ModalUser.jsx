/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HOST } from "../../Domain/host";
import { toast } from "react-toastify";

const ModalUser = ({ isOpen, onClose }) => {
  const [isUser, setIsUser] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });
  const [info, setInfo] = useState({});
  const [isModalRender, setIsModalRender] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    setIsModalRender(true);
    if (sessionStorage.getItem("iduser")) {
      setIsUser(true);
      setNameUser(sessionStorage.getItem("username"))
    }

    const handleClickOutside = (e) => {
      if (
        isModalRender &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose, isModalRender]);

  const handleLogOut = () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const validateEmail = (email) => {
    const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{3})+$/;
    return validEmail.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const validPassword =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
    return validPassword.test(password);
  };

  const validateForm = () => {
    let isValid = true;
    const error = {};

    if (!users.email) {
      isValid = false;
      error.email = "Email không được để trống!";
    } else if (!validateEmail(users.email)) {
      isValid = false;
      error.email = "Email không hợp lệ!";
    }

    if (!users.password) {
      isValid = false;
      error.password = "Password không được để trống!";
    }
    // else if (!validatePassword(users.password)) {
    //   isValid = false;
    //   error.password = "Password không hợp lệ!";
    // }

    setErrors(error);
    return isValid;
  };

  const hanldeLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        email: users.email,
        password: users.password,
      };
      await axios
        .post(`${HOST}/login`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            sessionStorage.setItem("iduser", res.data.id);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("email", res.data.email);
            toast("Đăng nhập thành công", {
              type: "success",
              position: "top-right",
            });
            setTimeout(() => {
              window.location.href = "/account";
            }, 1000);
          } else {
            toast("Đăng nhập thất bại!!!", {
              type: "warning",
              position: "top-right",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;

    setUsers((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <div
      ref={modalRef}
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed lg:absolute top-[7%] lg:top-[110%] right-0 lg:right-32 flex-col items-start text-start w-full lg:w-[30%] h-full lg:h-auto space-y-2 bg-white p-3 rounded-md shadow-md shadow-gray-400 triangle-up z-50`}
    >
      {isUser ? (
        <>
          <h3 className="font-bold text-3xl lg:text-xl">Thông tin tài khoản</h3>
          <ul>
            <li>Tên: {nameUser}</li>
            <li>
              <a href="/account">Tài khoản của tôi</a>
            </li>
            <li>
              <button onClick={() => handleLogOut()}>Đăng xuất</button>
            </li>
          </ul>
        </>
      ) : (
        <div className="w-full bg-white px-5 space-y-4">
          <h3 className="text-center uppercase font-medium text-xl">
            Đăng nhập tài khoản
            <span className="block font-normal lowercase text-sm text-center">
              Nhập email và mật khẩu của bạn
            </span>
          </h3>
          <div className="space-y-4">
            <form className="flex flex-col gap-3">
              <input
                name="email"
                value={users.email}
                onChange={onChangeInput}
                className="px-3 py-2 text-black rounded-md border w-full focus:outline-[--header-focus-outline]"
                type="text"
                placeholder="Email"
              />
              {errors.email ? (
                <p className="text-[--header-text-danger]"> {errors.email} </p>
              ) : (
                ""
              )}
              <input
                name="password"
                value={users.password}
                onChange={onChangeInput}
                className="px-3 py-2 text-black rounded-md border w-full focus:outline-[--header-focus-outline]"
                type="password"
                placeholder="Mật khẩu"
              />
              {errors.password ? (
                <p className="text-[--header-text-danger]">
                  {" "}
                  {errors.password}{" "}
                </p>
              ) : (
                ""
              )}
              <button
                onClick={hanldeLogin}
                className="uppercase w-full bg-[--header-button-bg-login] relative effect-button z-10 overflow-hidden text-white px-3 py-2 rounded-md"
              >
                Đăng nhập
              </button>
            </form>
            <div>
              <p>
                Khách hàng mới?{" "}
                <a
                  href="/account/register"
                  className="text-[--header-button-bg-login]"
                >
                  Tạo tài khoản
                </a>
              </p>
              <p>
                Bạn quên mật khẩu?{" "}
                <a
                  href="/account/fotgot-password"
                  className="text-[--header-button-bg-login]"
                >
                  Đặt lại mật khẩu
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUser;
