/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Products from "../API/Products";
import Coupons from "../API/Coupons";
import { AiOutlineClose } from "react-icons/ai";

const PopupDetailProduct = ({ onClose, slug }) => {
  const [showSlide, setShowSlide] = useState(0);
  const [detailProduct, setDetailProduct] = useState({});
  const [dataSize, setDataSize] = useState({});
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // lấy data detail
        const response = await Products.getDetailBySlug(slug).then(
          (res) => res.data
        );
        if (response.sucess) {
          setDetailProduct(response.result.list);
          setDataSize(response.result.list_size);
          // Lấy ra tên của collection đang show
          // await getNameCollection(response.result.list.product_type_id)
          // Lấy ra mã giảm giá
          await applyCouponDetailsToProduct(response.result.list);
          // Lấy ra giá tiền khuyến mãi nếu có
          await applyPricePromotionToProduct();
        }
      } catch (error) {
        console.log("Fetching data error:", error);
      }
    };
    fetchData();
  }, [slug]);

  // Xóa các dấu "," trong giá sản phẩm
  const removeCommasFromString = (str) => {
    return str.replace(/,/g, "");
  };
  // Định dạng lại giá với dấu ","
  const formatPriceWithCommas = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // xử lý giá tiền khi có giảm giá
  const calculateDiscount = (originalPrice, discountPercent) => {
    const numericPrice = parseFloat(removeCommasFromString(originalPrice));
    const numericDiscount = parseFloat(discountPercent);

    if (!isNaN(numericPrice) && !isNaN(numericDiscount)) {
      const discountedPrice = numericPrice * (1 - numericDiscount / 100);
      return formatPriceWithCommas(discountedPrice.toString());
    } else {
      console.error("Giá tiền cung cấp là giá trị số không hợp lệ!!!");
      return null;
    }
  };

  const applyCouponDetailsToProduct = async (product) => {
    if (product.coupon_id) {
      try {
        const response = await Coupons.getCouponById(product.coupon_id).then(
          (res) => res.data
        );
        setDetailProduct((prev) =>
          prev.id === product.id
            ? { ...prev, discountPercent: response.result.percent }
            : prev
        );
      } catch (error) {
        console.log("Error fetching coupons:", error);
      }
    }
  };

  const applyPricePromotionToProduct = async () => {
    setDetailProduct((prev) =>
      prev.discountPercent
        ? {
            ...prev,
            pricePromotion: calculateDiscount(prev.price, prev.discountPercent),
          }
        : prev
    );
  };

  const album = detailProduct.image ? detailProduct.image.split(",") : [];
  // const album = []

  const handlePreSlide = () => {
    setShowSlide((pre) => (pre - 1 + album.length) % album.length);
  };

  const handleNextSlide = () => {
    setShowSlide((pre) => (pre + 1) % album.length);
  };

  //   const handleAddToCart = (id) => {
  //     console.log("id", id);
  //     const data = {
  //       size: size,
  //     };
  //     console.log("data", data);
  //   };
  const selectSize = (size) => {
    setSize(size);
  };

  return (
    <div
      onClick={onClose}
      id="Modal-detail-product"
      className="overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center w-full px-2 h-full"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 xl:w-2/4 w-full p-2">
        <div className="text-end absolute right-3 top-3">
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-4 ms-3 text-base font-medium text-gray-900 focus:outline-none bg-white hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div onClick="e.stopImmediatePropagation" className="pt-12">
          <div className="flex lg:flex-row flex-col">
            <div className="basis-1/2 lg:border-r lg:pr-4 border-none pr-0 overflow-hidden">
              <div className="relative lg:w-full w-[200px] mx-auto overflow-hidden">
                <div className="overflow-x-scroll scroller-overflow rounded-md">
                  <div
                    className={`
                                    flex transition-all duration-300 ease-in-out w-full
                                    `}
                    style={{
                      transform: `translateX(-${showSlide * 100}%)`,
                    }}
                  >
                    {album.map((val, idx) => (
                      <div key={idx} className="w-full">
                        <div className="image-product--detail rounded-md lg:w-[29vw] w-[200px] h-[300px]">
                          <img
                            src={val}
                            alt={`image-${idx}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePreSlide}
                    className="absolute top-1/2 left-0 -translate-y-1/2"
                  >
                    <MdKeyboardArrowLeft size={40} color="black" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute top-1/2 right-0 -translate-y-1/2"
                  >
                    <MdKeyboardArrowRight size={40} color="black" />
                  </button>
                </div>
              </div>
              {/* under slide */}
              <div className="flex justify-center gap-x-2 py-2">
                {album.map((val, key) => (
                  <div
                    onClick={() => setShowSlide(key)}
                    key={key}
                    className={`
                                            image-product--detail overflow-hidden py-2 border h-20 w-20
                                            ${
                                              key === showSlide
                                                ? "border-[--detail-border-yellow]"
                                                : "border-gray-300"
                                            }
                                        `}
                  >
                    <img
                      src={val}
                      alt="imgproduct"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col text-black space-y-4 rounded-md basis-1/2">
              <h3 className="text-2xl font-semibold">{detailProduct.name}</h3>
              <div className="flex items-center gap-x-4">
                <p className="text-sm">
                  Tình trạng:{" "}
                  <span className="text-[--detail-text-primary] font-semibold">
                    {detailProduct.status}
                  </span>
                </p>
                {!detailProduct.provider_id && (
                  <p className="text-sm">
                    Thương hiệu:{" "}
                    <span className="text-[--detail-text-primary] font-semibold">
                      chưa có
                    </span>
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <b className="w-28 lg:block hidden">Giá:</b>
                <div className="flex items-center gap-x-3 lg:bg-inherit bg-gray-100 p-4 rounded-md w-full">
                  <p className="font-bold md:text-2xl text-base text-[#ff0000] flex items-center">
                    {detailProduct.pricePromotion
                      ? detailProduct.pricePromotion
                      : detailProduct.price}
                    ₫
                    <del
                      className={`text-gray-500 md:text-base text-sm pl-3 ${
                        detailProduct.pricePromotion ? "block" : "hidden"
                      }`}
                    >
                      {detailProduct.price}₫
                    </del>
                  </p>
                  <span className="border md:text-xs text-[10px] px-4 font-semibold rounded-sm text-[--detail-text-primary] border-[--detail-border-primary]">
                    {detailProduct.discountPercent}%
                  </span>
                </div>
              </div>
              {dataSize.length > 0 && (
                <div className="flex items-center flex-wrap gap-y-4">
                  <b className="w-28 lg:block hidden">Tiêu đề:</b>
                  {dataSize.length > 0 &&
                    dataSize.map((val, key) => (
                      <div
                        key={key}
                        className="pr-4 relative flex justify-center items-center cursor-pointer transition-all duration-300 ease-in"
                      >
                        <input
                          className="appearance-none input-item_radio"
                          type="radio"
                          name="size"
                          id={val.color_size}
                          defaultChecked={
                            dataSize[0].color_size === val.color_size
                              ? true
                              : false
                          }
                        />
                        <label
                          className="relative text-center font-bold transform-none cursor-pointer border rounded-md px-6 py-1 text-black input-item_label"
                          htmlFor={val.color_size}
                          onClick={() => selectSize(val.color_size)}
                        >
                          {val.color_size}
                        </label>
                      </div>
                    ))}
                </div>
              )}
              <div className="flex items-center">
                <b className="w-28 lg:block hidden">Số lượng:</b>
                <div className="flex items-center">
                  <button
                    disabled={count === 1 ? true : false}
                    className={`${count === 1 ? "bg-gray-200" : ""}
                                text-center text-xl hover:font-bold hover:bg-gray-200 text-black border h-8 w-8`}
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    -
                  </button>
                  <p className="h-8 w-8 text-xl border text-center">{count}</p>
                  <button
                    disabled={detailProduct.quantity === "1" ? true : false}
                    className={`${
                      detailProduct.quantity === "1" ? "bg-gray-200" : ""
                    } text-center text-xl hover:font-bold hover:bg-gray-200 text-black border h-8 w-8`}
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-4 flex-col w-full lg:w-3/4">
                {/* <button
                  onClick={() =>
                    (location.href = `/detail/${detailProduct.slug}`)
                  }
                  className="relative py-2 rounded-md font-semibold text-lg effect-button--detail z-20 overflow-hidden border border-[--detail-border-primary] text-[--detail-text-primary] uppercase basis-full"
                >
                  Thêm giỏ hàng
                </button> */}
                <a
                  href={`/detail/${detailProduct.slug}`}
                //   className="text-center py-2 hover:underline"
                  className=" text-center relative py-2 rounded-md font-semibold text-lg effect-button--detail z-20 overflow-hidden border border-[--detail-border-primary] text-[--detail-text-primary] uppercase basis-full"
                >
                  Thêm giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailProduct;
