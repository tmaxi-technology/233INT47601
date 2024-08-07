import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HOST } from "../Share/Domain/host";
import { toast } from "react-toastify";
const FormRegister = () => {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    birthday: "",
    password: "",
  });
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

    if (!users.firstName) {
      isValid = false;
      error.firstName = "Họ không được để trống!";
    }

    if (!users.lastName) {
      isValid = false;
      error.lastName = "Tên không được để trống!";
    }

    if (!users.birthday) {
      isValid = false;
      error.birthday = "Ngày sinh không được để trống!";
    }

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

  const hanldeRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        email: users.email,
        password: users.password,
        birth: users.birthday,
        username: users.firstName + users.lastName,
        gender: users.gender,
      };
      await axios
        .post(`${HOST}/register`, data)
        .then((res) => res.data)
        .then((data) => {
          if (data.success) {
            toast(data.mes, {
              type: "success",
              position: "top-right",
            });
            setTimeout(() => {
              window.location.href = "/account/login";
            }, 1000);
          } else {
            toast(data.mes, {
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
    <div className="container md:mx-auto mx-4">
      <div className="bg-white p-4 space-y-4 w-full md:max-w-xl mx-auto my-20">
        <h3 className="text-center text-xl font-bold">
          <Link to="/account/login" className={`text-gray-300 pr-2`}>
            Đăng nhập
          </Link>
          |
          <Link to="/account/register" className={`text-black pl-2`}>
            Đăng ký
          </Link>
        </h3>
        <div>
          <form className="space-y-4">
            <input
              name="firstName"
              value={users.firstName}
              onChange={onChangeInput}
              className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]"
              type="text"
              placeholder="Họ"
            />
            {errors.firstName ? (
              <p className="text-red-600"> {errors.firstName} </p>
            ) : (
              ""
            )}
            <input
              name="lastName"
              value={users.lastName}
              onChange={onChangeInput}
              className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]"
              type="text"
              placeholder="Tên"
            />
            {errors.lastName ? (
              <p className="text-red-600"> {errors.lastName} </p>
            ) : (
              ""
            )}
            <div className="flex gap-2">
              <label className="flex gap-2" htmlFor="radio1">
                <input
                  name="option"
                  id="radio1"
                  value={users.gender}
                  checked={users.gender === "Nữ" ? true : false}
                  onChange={() => setUsers({ ...users, gender: "Nữ" })}
                  className="px-5 py-4 text-black bg-[--bgMain] rounded-md border w-full focus:outline-[#f9bb01]"
                  type="radio"
                  placeholder=""
                />
                <p>Nữ</p>
              </label>
              <label className="flex gap-2" htmlFor="radio2">
                <input
                  name="option"
                  id="radio2"
                  value={users.gender}
                  checked={users.gender === "Nam" ? true : false}
                  onChange={() => setUsers({ ...users, gender: "Nam" })}
                  className="px-5 py-4 text-black bg-[--bgMain] rounded-md border w-full focus:outline-[#f9bb01]"
                  type="radio"
                  placeholder=""
                />
                <p>Nam</p>
              </label>
            </div>
            <input
              name="birthday"
              value={users.birthday}
              onChange={onChangeInput}
              className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]"
              type="date"
              placeholder=""
            />
            {errors.birthday ? (
              <p className="text-red-600"> {errors.birthday} </p>
            ) : (
              ""
            )}
            <input
              name="email"
              value={users.email}
              onChange={onChangeInput}
              className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]"
              type="text"
              placeholder="Email"
            />
            {errors.email ? (
              <p className="text-red-600"> {errors.email} </p>
            ) : (
              ""
            )}
            <input
              name="password"
              value={users.password}
              onChange={onChangeInput}
              className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]"
              type="password"
              placeholder="Password"
            />
            {errors.password ? (
              <p className="text-red-600"> {errors.password} </p>
            ) : (
              ""
            )}
            <div className="flex justify-between gap-4 items-center flex-wrap">
              <button
                onClick={hanldeRegister}
                className="md:basis-1/3 basis-full w-full bg-[#efb93b] relative effect-button z-10 overflow-hidden text-white px-5 py-4 rounded-md"
              >
                Đăng ký
              </button>
              <p>
                Bạn đã có tài khoản?
                <a href="/account/login" className="text-blue-600">
                  Đăng nhập ngay
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
