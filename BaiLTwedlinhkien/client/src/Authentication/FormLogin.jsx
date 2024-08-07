import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { HOST } from "../Share/Domain/host"
import { toast } from "react-toastify"
const FormLogin = () => {
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState({
        email: "",
        password: ""
    })
    const validateEmail = (email) => {
        const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{3})+$/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validateForm = () => {
        let isValid = true;
        const error = {};

        if (!users.email) {
            isValid = false
            error.email = "Email không được để trống!"
        } else if (!validateEmail(users.email)) {
            isValid = false
            error.email = "Email không hợp lệ!"
        }

        if (!users.password) {
            isValid = false
            error.password = "Password không được để trống!"
        }

        setErrors(error);
        return isValid
    }

    const hanldeLogin = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            const data = {
                email: users.email,
                password: users.password
            }
            await axios.post(`${HOST}/login`, data)
                .then((res) => res.data)
                .then(res => {
                    if (res.success) {
                        sessionStorage.setItem('iduser', res.data.id)
                        sessionStorage.setItem('username', res.data.username)
                        sessionStorage.setItem('email', res.data.email)
                        toast("Đăng nhập thành công", { type: "success", position: "top-right" })
                        setTimeout(() => {
                            window.location.href = "/account"
                        }, 1000)
                    } else {
                        toast("Đăng nhập thất bại!!!", { type: "warning", position: "top-right" })
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target

        setUsers(pre => ({
            ...pre,
            [name]: value
        }))
    }
    return (
        <div className="container mx-auto">
            <div className="bg-white p-4 space-y-4 w-full md:max-w-xl mx-auto my-20">
                <h3 className="text-center text-xl font-bold">
                    <Link to="/account/login" className={`text-black pr-2`}>
                        Đăng nhập
                    </Link>
                    |
                    <Link to="/account/register" className={`text-gray-300 pl-2`}>
                        Đăng ký
                    </Link>
                </h3>
                <div>
                    <form className="space-y-4">
                        <input name="email" value={users.email} onChange={onChangeInput} className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]" type="text" placeholder="Email" />
                        {errors.email ? (<p className="text-red-600"> {errors.email} </p>) : ""}
                        <input name="password" value={users.password} onChange={onChangeInput} className="px-5 py-4 text-black bg-[--form-bg-main] focus:bg-white rounded-md border w-full focus:outline-[#f9bb01]" type="password" placeholder="Password" />
                        {errors.password ? (<p className="text-red-600"> {errors.password} </p>) : ""}
                        <div className="flex justify-between gap-4 items-center flex-wrap">
                            <button onClick={hanldeLogin} className="md:basis-1/3 basis-full w-full bg-[#efb93b] relative effect-button z-10 overflow-hidden text-white px-5 py-4 rounded-md">
                                Đăng nhập
                            </button>
                            <p>
                                Bạn chưa có tài khoản?
                                <a href="/account/register" className="text-blue-600">
                                    Đăng ký ngay
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormLogin