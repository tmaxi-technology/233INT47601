/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaMedal } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa";

import Categories from "../../../API/Categories";

const Navbar = (props) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const [checkHomePage, setCheckHomePage] = useState(false);
  const [showItemCategories, setShowItemCategories] = useState(false);
  const [titleNavbar, setTitleNavbar] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [dataCategory, setDataCategory] = useState([]);
  const [dataChildrenCate, setDataChildrenCate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filter = "?limit=7";
      const category = await Categories.getAllCategories(filter).then(
        (res) => res.data
      );
      if (category.results) {
        setDataCategory(category.results.list);
      }

      const product_type = await Categories.getItemsChildrenCategories().then(
        (res) => res.data
      );
      if (product_type.results) {
        setDataChildrenCate(product_type.results.list);
      }
    };
    fetchData();

    setCheckHomePage(location.pathname === "/");
    if (!checkHomePage) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();

    window.addEventListener("resize", () => checkMobile());
    return () => {
      window.removeEventListener("resize", () => checkMobile());
    };
  }, [checkHomePage, location.pathname]);

  const handleOnMouveMove = (name, items) => {
    if (items) {
      setTitleNavbar(name);
      setShowItemCategories(true);
    } else {
      setShowItemCategories(false);
    }
  };
  // Gộp mảng dựa trên id và category_id
  const mergeArray = dataCategory.map((item1) => {
    const matchingItem = dataChildrenCate.filter(
      (item2) => parseInt(item2.category_id) === parseInt(item1.id)
    );
    // nếu có phần tử trùng khớp, tạo 1 object mới với phần tử khớp sẽ nằm ở trong items
    if (matchingItem.length > 0) {
      return {
        ...item1,
        items: matchingItem,
      };
    }
    // Nếu không có phần tử khớp, trả về item1 không thay đổi
    return item1;
  });

  const handleOpenNavbarWhenNotHomePage = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <div className="bg-[--bg-navbar]">
      <div className="container mx-auto flex">
        <div className="relative basis-full lg:basis-1/5 shadow-lg shadow-[--header-bg-main]">
          {/* showNavbar phải là true và khác "/" thì mới show */}
          {!showNavbar && location.pathname !== "/" && (
            <div className="fixed inset-0 bg-black opacity-50 z-30" />
          )}
          <button
            onClick={() => !checkHomePage && handleOpenNavbarWhenNotHomePage()}
            className={`${
              checkHomePage ? "cursor-default" : ""
            } relative hidden text-black lg:flex justify-start items-center gap-3 px-4 py-3 border-x w-full z-40 bg-white`}
          >
            <GiHamburgerMenu />
            <span className="uppercase font-bold pr-4">Danh mục sản phẩm</span>
          </button>
          {!isMobile ? (
            <ul
              className={`${!showNavbar ? "block select-none" : "hidden"}
                          z-40 absolute top-full left-0 rounded-md rounded-t-none w-full lg:h-max bg-white text-black text-start text-sm pb-20 border-x shadow-lg shadow-[--header-bg-main]`}
            >
              {mergeArray &&
                mergeArray.map((val, idx) => {
                  return (
                    <li
                      key={idx}
                      className="px-1 py-2 w-full relative item-navbar border-b cursor-pointer"
                      onMouseMove={() =>
                        !isMobile && handleOnMouveMove(val.name, val.items)
                      }
                      onClick={() =>
                        isMobile && handleOnMouveMove(val.name, val.items)
                      }
                    >
                      {val.items ? (
                        <p className="hidden gap-3 lg:flex justify-between items-center py-1 px-3">
                          {val.name}
                          <span
                            className={`${
                              val.items ? "block" : "hidden"
                            } text-md font-bold`}
                          >
                            {">"}
                          </span>
                        </p>
                      ) : (
                        <a
                          href={`/collections/category_id=${val.id}`}
                          className="hidden gap-3 lg:flex justify-between items-center py-1 px-3"
                        >
                          {val.name}
                          <span
                            className={`${
                              val.items ? "block" : "hidden"
                            } text-md font-bold`}
                          >
                            {">"}
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })}
            </ul>
          ) : (
            <ul
              className={`${!props.open ? "hidden" : "block"} z-50
                            absolute top-full left-0 rounded-md w-full h-screen lg:h-max bg-white text-black text-start text-sm pb-10 border-x shadow-lg shadow-[--header-bg-main]`}
            >
              {mergeArray &&
                mergeArray.map((val, idx) => {
                  return (
                    <li
                      key={idx}
                      className="px-1 py-2 w-full relative item-navbar border-b cursor-pointer"
                      onClick={() =>
                        isMobile && handleOnMouveMove(val.name, val.items)
                      }
                    >
                      {val.items ? (
                        <p className="lg:hidden gap-3 flex justify-between items-center py-1 px-3">
                          {val.name}
                          <span className={`text-md font-bold`}>{">"}</span>
                        </p>
                      ) : (
                        <a
                          href={`/collections/category_id=${val.id}`}
                          className="lg:hidden gap-3 flex justify-between items-center py-1 px-3"
                        >
                          {val.name}
                        </a>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
          {/* Child Categories  */}
          {showItemCategories ? (
            <div
              onMouseLeave={() => setShowItemCategories(false)}
              className="absolute top-full left-0 lg:left-full text-black font-medium bg-white h-screen lg:h-[400px] w-full lg:w-[50vw] border shadow-md z-50"
            >
              <button
                onClick={() => setShowItemCategories(false)}
                className="lg:hidden flex gap-2 items-center border-b w-full text-start py-4 px-3 uppercase font-bold text-black"
              >
                <FaAngleLeft /> Trở lại
              </button>
              <ul className="grid lg:grid-cols-4 grid-rows-1">
                {mergeArray
                  .filter((category) => category.name === titleNavbar)
                  .map((val) =>
                    val.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="p-4 border-b lg:border-b-0 w-full"
                      >
                        <a href={`/collections/product_type_id=${item.id}`}>
                          {item.name}
                        </a>
                      </li>
                    ))
                  )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <ul className="hidden lg:flex gap-5 px-4 basis-4/5 text-white">
          <li className="flex justify-start items-center gap-1 px-4">
            <FaMedal />
            <span>Đảm bảo chất lượng</span>
          </li>
          <li className="flex justify-start items-center gap-1 px-4">
            <IoCheckmarkDoneCircleOutline />
            <span>Mở hộp kiểm tra nhận hàng</span>
          </li>
          <li className="flex justify-start items-center gap-1 px-4">
            <TbTruckDelivery />
            <span>Vận chuyển siêu tốc</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
