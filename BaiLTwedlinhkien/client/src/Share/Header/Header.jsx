/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

import "./index.css";
import { CountContext } from "../../Context/CountContext";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import ModalUser from "./components/ModalUser";
import logo from "../../assets/logo.png";
function Header() {
  // Sử dụng useContext lấy số lượng sản phẩm và yêu thích
  const { countWishlist, countCart } = useContext(CountContext);

  const [loginUser, setLoginUser] = useState(false);
  const [username, setUsername] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  var idUser = sessionStorage.getItem("iduser");

  useEffect(() => {
    if (!idUser) {
      setLoginUser(false);
    } else {
      setLoginUser(true);
      setUsername(sessionStorage.getItem("username"));
    }
  }, [idUser]);

  const handleOpenNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  const openModal = () => {
    setChangeIcon(!changeIcon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 shadow-md bg-[--header-bg-main] z-50">
        <div className="bg-black text-center py-1 text-white text-sm lg:block hidden">
          Hotline: <b>0903 25 10 99 - 0909 340 199</b> * Tư vấn build PC:{" "}
          <b>0909340199 </b> * Địa chỉ: <b>64 </b> Võ Công Tồn - Q.Tân Phú - TP.HCM
        </div>
        <div className="container mx-auto py-3 lg:px-0 px-4 relative">
          <div className="flex items-center justify-between text-black">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden flex flex-col text-center"
                onClick={() => handleOpenNavbar()}
              >
                {!openNavbar ? (
                  <GiHamburgerMenu color="black" fontSize={25} />
                ) : (
                  <AiOutlineClose color="black" fontSize={25} />
                )}
                <span className="text-[10px] text-white">MENU</span>
              </button>
              <Link href="/">
                <img
                  src={logo}
                  alt="logo"
                  className="w-16 object-cover"
                />
              </Link>
            </div>

            <div className="w-1/2 hidden lg:block">
              <Search />
            </div>

            <div className="flex items-center gap-3">
              <div className="lg:flex gap-3">
                {/* for moblile */}
                <button onClick={() => openModal()} className="lg:hidden block">
                  {!changeIcon ? (
                    <AiOutlineUser size={30} className="text-gray-500" />
                  ) : (
                    <AiOutlineClose color="black" fontSize={25} />
                  )}
                </button>
                {/* for moblile */}
                {/* for desktop */}
                <button onClick={() => openModal()} className="hidden lg:block">
                  <AiOutlineUser size={30} className="text-gray-500" />
                </button>
                {/* for desktop */}

                <div className="hidden lg:block text-sm font-medium">
                  <button
                    onClick={() => openModal()}
                    className="flex flex-col items-center gap-1 text-black"
                  >
                    <div className="flex gap-1">
                      {loginUser ? (
                        <>
                          <p>Tài khoản của</p>
                        </>
                      ) : (
                        <>
                          <p>Đăng nhập</p> / <p>Đăng ký</p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {loginUser ? username : "Tài khoản của tôi"}
                      <span className="inline-block text-gray-500">
                        <FaAngleDown />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <a
                  className="flex items-center gap-3 text-sm font-medium"
                  href="/cart"
                >
                  <button className="relative">
                    <span className="quantity-cart" data-order={countCart} />
                    <AiOutlineShoppingCart className="icon-cart" />
                  </button>
                  <span className="hidden lg:block">Giỏ hàng</span>
                </a>
              </div>
            </div>
            {isModalOpen ? (
              <ModalUser isOpen={isModalOpen} onClose={closeModal} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-full block lg:hidden py-2 px-4 border-t border-white">
          <Search />
        </div>
      </div>
      <div>
        <Navbar open={openNavbar} setOpen={setOpenNavbar} />
      </div>
    </>
  );
}

export default Header;
