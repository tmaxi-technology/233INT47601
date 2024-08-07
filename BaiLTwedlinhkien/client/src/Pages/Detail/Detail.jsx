import { useEffect, useState, useContext } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import CardSection from "../../Components/CardSection";
import CardProduct from "../../Components/CardProduct";
import { v4 as uuid } from "uuid";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { CountContext } from "../../Context/CountContext";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import Products from "../../API/Products";
import Cart from "../../API/carts";
import Coupons from "../../API/Coupons";
import Product_type from "../../API/Product_type";
import Provider from "../../API/Provider";
import { formatNumberWithCommas } from "../../Share/utils";

import Form from "react-bootstrap/Form";

const Detail = () => {
  const { setReloadCount } = useContext(CountContext);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [showText, setShowText] = useState(false);
  const [showSlide, setShowSlide] = useState(0);
  const [detailProduct, setDetailProduct] = useState({});
  console.log("detailProduct", detailProduct);
  const [dataSize, setDataSize] = useState({});
  const [dataProducts, setDataProducts] = useState([]);
  const [nameCollection, setNameCollections] = useState("");
  const [provider, setProvider] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // lấy data detail
        const response = await Products.getDetailBySlug(id).then(
          (res) => res.data
        );
        // lấy data products liên quan
        await Products.getAllProduct()
          .then((res) => res.data)
          .then((data) => setDataProducts(data.results.list))
          .catch((err) => console.log("Error fetching all data:", err));
        if (response.sucess) {
          setDetailProduct(response.result.list);
          setDataSize(response.result.list_size);
          // Lấy ra tên của collection đang show
          if (response.result.list.product_type_id !== "0") {
            await getNameCollection(response.result.list.product_type_id);
          }
          // get brand
          if (response.result.list.provider_id) {
            await getNameProvider(response.result.list.provider_id);
          }
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
  }, [id]);

  const album = detailProduct.image ? detailProduct.image.split(",") : [];

  const selectSize = (size) => {
    setSize(size);
  };

  const handlePreSlide = () => {
    setShowSlide((pre) => (pre - 1 + album.length) % album.length);
  };

  const handleNextSlide = () => {
    setShowSlide((pre) => (pre + 1) % album.length);
  };

  const handleAddToCart = async () => {
    const product_id = detailProduct.id;
    var user_id = sessionStorage.getItem("iduser");
    if (!sessionStorage.getItem("iduser")) {
      var unique_id = uuid();
      user_id = unique_id.slice(0, 8);
      sessionStorage.setItem("iduser", user_id);
    }
    const amount = removeCommasFromString(detailProduct.amount);
    const price = removeCommasFromString(detailProduct.price);
    const data = {
      product_id: product_id,
      user_id: user_id,
      size_color: size,
      quantity: count,
      price: detailProduct.amount
        ? parseInt(amount) * count
        : parseInt(price) * count,
    };
    const res = await Cart.addToCart(data);
    if (res.data.sucess) {
      await setReloadCount(false);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Bạn Đã Thêm Hàng Thành Công!");
    }
  };
  // Xóa các dấu "," trong giá sản phẩm
  const removeCommasFromString = (str) => {
    if (str) {
      return str.replace(/,/g, "");
    }
    return;
  };
  // Định dạng lại giá với dấu ","
  const formatPriceWithCommas = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // getNameProvider
  const getNameProvider = async (id) => {
    await Provider.getProviderById(id)
      .then((res) => {
        const provider = res.data.result.name;
        setProvider(provider);
      })
      // .then((data) => setNameCollections(data.result))
      .catch((err) => console.log("Get name collection error:", err));
  };
  const getNameCollection = async (id) => {
    await Product_type.getProductTypeById(id)
      .then((res) => {
        // console.log("res", res);
      })
      // .then((data) => setNameCollections(data.result))
      .catch((err) => console.log("Get name collection error:", err));
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
            amount: calculateDiscount(prev.price, prev.discountPercent),
          }
        : prev
    );
  };
  return (
    <div>
      <BreadCrumbs>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "text-black pr-2" : "text-gray-500 pr-2"
          }
        >
          Trang chủ
        </Link>
        {nameCollection && (
          <>
            /
            <Link
              to={`/collections/${nameCollection.slug}`}
              className="text-black pr-2"
            >
              {nameCollection.name}
            </Link>
          </>
        )}
        /<p className="text-black pr-2">{detailProduct.name}</p>
      </BreadCrumbs>

      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col p-4 rounded-sm gap-4 bg-white">
          <div className="lg:border-r lg:pr-4 border-none pr-0 overflow-hidden basis-[35%]">
            <div className="relative lg:w-full w-[300px] mx-auto overflow-hidden">
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
                      <div className="image-product--detail rounded-md lg:w-[29vw] w-[300px] h-[300px]">
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
                      image-product--detail overflow-hidden py-2 border h-24 w-24
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
          <div className="basis-[70%]">
            <div className="flex flex-col text-black space-y-4 rounded-md">
              <h3 className="text-2xl font-semibold">{detailProduct.name}</h3>
              <div className="flex items-center gap-x-4">
                {/* <p className="text-sm">
                  Tình trạng:{" "}
                  <span className="text-[--detail-text-primary] font-semibold">
                    {detailProduct.status}
                  </span>
                </p> */}
                {!detailProduct.provider_id ? (
                  <p className="text-sm">
                    Thương hiệu:{" "}
                    <span className="text-[--detail-text-primary] font-semibold">
                      chưa có
                    </span>
                  </p>
                ) : (
                  <p className="text-sm">
                    Thương hiệu:{" "}
                    <span className="text-[--detail-text-primary] font-semibold">
                      {provider}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <b className="w-28 lg:block hidden">Giá:</b>
                <div className="flex items-center gap-x-3 lg:bg-inherit bg-gray-100 p-4 rounded-md w-full">
                  <p className="font-bold md:text-2xl text-base text-[#ff0000] flex items-center">
                    {detailProduct.amount
                      ? detailProduct.amount
                      : formatNumberWithCommas(detailProduct.price)}
                    ₫
                    <del
                      className={`text-gray-500 md:text-base text-sm pl-3 ${
                        detailProduct.amount ? "block" : "hidden"
                      }`}
                    >
                      {formatNumberWithCommas(detailProduct.price)}₫
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
              <div className="flex gap-4 lg:flex-row flex-col w-full lg:w-3/4">
                {detailProduct.quantity === "0" || !detailProduct.quantity ? (
                  <button className="relative py-2 rounded-md font-semibold text-lg effect-button--detail z-20 overflow-hidden border border-[--detail-border-primary] text-[--detail-text-primary] uppercase lg:basis-1/2 basis-full">
                    Hết hàng
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart()}
                    className="relative py-2 rounded-md font-semibold text-lg effect-button--detail z-20 overflow-hidden border border-[--detail-border-primary] text-[--detail-text-primary] uppercase lg:basis-1/2 basis-full"
                  >
                    Thêm giỏ hàng
                  </button>
                )}

                {/* <button
                  onClick={() => (window.location.href = "/cart")}
                  className="relative py-2 rounded-md font-semibold text-lg effect-button--detail z-20 overflow-hidden border bg-[--detail-bg-primary] border-[--detail-border-primary] text-white uppercase lg:basis-1/2 basis-full"
                >
                  Mua ngay
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="bg-white p-4 rounded-sm text-black ">
            <h3 className="uppercase text-lg font-semibold border-b pb-2">
              Mô tả sản phẩm
            </h3>
            <Form.Group
              className={`relative py-4 overflow-hidden transition-all duration-300 ease-in-out
                            ${showText ? "h-52" : "h-full"}  
                        `}
              controlId="formBasicPassword"
            >
              <Form.Control
                rows={30}
                className="w-full"
                as="textarea"
                placeholder="Hãy để lại mô tả sản phẩm ở đây!"
                value={detailProduct.description}
              />
            </Form.Group>

            <div className="text-center w-full">
              <button
                onClick={() => setShowText(!showText)}
                className="font-semibold px-4 py-2 border rounded-md text-[--detail-text-primary] border-[--detail-border-primary]"
              >
                {showText ? "- Rút gọn nội dung" : "+ Xem thêm nội dung"}
              </button>
            </div>
          </div>
        </div>
        <CardSection title="Sản phẩm liên quan" color="black">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 mx-auto product-section">
            {dataProducts &&
              dataProducts.slice(0, 4).map((val, key) => (
                <div key={key} className="w-full h-full">
                  <CardProduct {...val} />
                </div>
              ))}
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default Detail;
