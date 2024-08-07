/* eslint-disable react-hooks/exhaustive-deps */
import slide_1 from "../../assets/slide_1_img.png";
import Slides from "./components/Slides";
import banner1 from "../../assets/categorybanner_1_img.png";
import banner2 from "../../assets/categorybanner_2_img.png";
import banner3 from "../../assets/categorybanner_3_img.png";
import banner4 from "../../assets/categorybanner_4_img.png";
import BannerHome from "./components/BannerHome";

import CardSection from "../../Components/CardSection";
import CardProduct from "../../Components/CardProduct";

import home_tabs_1_banner from "../../assets/home_tabs_1_banner.png";
import { useEffect, useState } from "react";

import Products from "../../API/Products";
import Coupons from "../../API/Coupons";
import PopupDetailProduct from "../../Components/PopupDetailProduct";

const HomePage = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataByBrand, setDataByBrand] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      const filter = "?limit=12"
      const res = await Products.getAllProduct(filter).then((res) => res.data);
      if (res.sucess) {
        setDataProduct(res.results.list);
        // Xử lý gọi và thêm mã giảm giá vào list products
        for (const product of res.results.list) {
          // Lấy ra mã giảm giá
          if(product.coupon_id && product.coupon_id !== "Coupons") {
            await applyCouponDetailsToProduct(product);
          }
          applyPricePromotionToProduct(product);
        }
      } else {
        setDataProduct(null);
      }
    };
    const getByBrand = async () => {
      const filter = "?limit=12&provider_id=14"
      const res = await Products.getAllProduct(filter).then((res) => res.data);
      if (res.sucess) {
        setDataByBrand(res.results.list);
        // Xử lý gọi và thêm mã giảm giá vào list products
        for (const product of res.results.list) {
          // Lấy ra mã giảm giá
          if(product.coupon_id && product.coupon_id !== "Coupons") {
            await applyCouponDetailsToProduct(product);
          }
          applyPricePromotionToProduct(product);
        }
      } else {
        setDataByBrand(null);
      }
    };
    getByBrand();
    fetchData();
  }, []);

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

    if (numericPrice && numericDiscount) {
      const discountedPrice = numericPrice * (1 - numericDiscount / 100);
      return formatPriceWithCommas(discountedPrice.toString());
    }
    return null;
  };

  const applyCouponDetailsToProduct = async (product) => {
    if (product.coupon_id) {
        const response = await Coupons.getCouponById(product.coupon_id).then(
          (res) => res.data
        );
        if (response.sucess) {
          setDataProduct((prev) =>
            prev.map((prevProduct) =>
              prevProduct.id === product.id
                ? { ...prevProduct, discountPercent: response.result.percent }
                : prevProduct
            )
          );
        }
    }
    return null;
  };

  const applyPricePromotionToProduct = (product) => {
    setDataProduct((prev) =>
      prev.map((prevProduct) =>
        prevProduct.id === product.id
          ? {
              ...prevProduct,
              pricePromotion: calculateDiscount(
                product.price,
                prevProduct.discountPercent
              ),
            }
          : prevProduct
      )
    );
  };
  return (
    <div className="bg-[--home-bg-main]">
      <div className="container mx-auto p-0 lg:p-4">
        <div className="flex gap-4">
          <div className="basis-1/5 max-w-[20%] hidden lg:block" />
          <div className="lg:basis-4/5 basis-full lg:max-w-[80%] max-w-full">
            <div className="flex gap-4 lg:flex-row flex-col">
              <div className="basis-4/6 hover:cursor-pointer rounded overflow-hidden">
                <img
                  src={slide_1}
                  alt={slide_1}
                  className="h-full w-full object-cover"
                />
              </div>
              <Slides />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 pt-14">
          <div className="cursor-pointer rounded-md overflow-hidden w-full">
            <img
              src={banner1}
              alt={banner1}
              className="h-full hover:scale-110 transition-all ease-in-out duration-300 w-full object-fill"
            />
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden w-full">
            <img
              src={banner2}
              alt={banner2}
              className="h-full hover:scale-110 transition-all ease-in-out duration-300 w-full object-fill"
            />
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden w-full">
            <img
              src={banner3}
              alt={banner3}
              className="h-full hover:scale-110 transition-all ease-in-out duration-300 w-full object-fill"
            />
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden w-full">
            <img
              src={banner4}
              alt={banner4}
              className="h-full hover:scale-110 transition-all ease-in-out duration-300 w-full object-fill"
            />
          </div>
        </div>

        {/* open modal detail product */}
        {isOpen && <PopupDetailProduct slug={slug} onClose={handleOpenModal} />}

        {/* Sản phẩm khuyến mãi */}
        {/* Giới hạn data lấy ra "10" */}
        <CardSection
          title="Sản phẩm khuyến mãi"
          color="#ffffff"
          background="#a2620a"
        >
          <div className="overflow-hidden">
            <div className="relative product-scroll overflow-x-scroll snap-x snap-mandatory whitespace-normal scroller-overflow flex gap-4 w-full">
              {dataProduct.length > 0 &&
                dataProduct.map((val, key) => (
                  <div
                    key={key}
                    className={`w-full h-full`}
                    onClick={() => setSlug(val.slug)}
                  >
                    <CardProduct {...val} handleOpenModal={handleOpenModal} />
                  </div>
                ))}
            </div>
          </div>
        </CardSection>

        {/* Top sản phẩm bấm chạy */}
        {/* Giới hạn data lấy ra "10" */}
        <CardSection
          title="Top sản phẩm bán chạy"
          color="#000000"
          bbackground="#f5f5f5"
        >
          <div className="overflow-hidden">
            <div className="relative product-scroll overflow-x-scroll snap-x snap-mandatory whitespace-normal scroller-overflow flex gap-4 w-full">
              {dataProduct.length > 0 &&
                dataProduct.map((val, key) => (
                  <div
                    key={key}
                    className={`w-full h-full`}
                    onClick={() => setSlug(val.slug)}
                  >
                    <CardProduct {...val} handleOpenModal={handleOpenModal} />
                  </div>
                ))}
            </div>
          </div>
        </CardSection>

        {/* Banner Group Home */}
        <BannerHome />

        {/* Linh kiện máy tính */}
        {/* Giới hạn data lấy ra "8" */}
        <CardSection
          title="Linh kiện máy tính"
          color="black"
          background="#f5f5f5"
        >
          <div className="flex gap-4">
            {/* <div className="xl:block hidden basis-1/4">
              <img
                src={home_tabs_1_banner}
                alt={home_tabs_1_banner}
                className="h-full w-full object-fill"
              />
            </div> */}
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 mx-auto product-section">
              {dataProduct.length > 0 &&
                dataProduct.map((val, key) => (
                  <div
                    key={key}
                    className={`w-full h-full`}
                    onClick={() => setSlug(val.slug)}
                  >
                    <CardProduct {...val} handleOpenModal={handleOpenModal} />
                  </div>
                ))}
            </div>
          </div>
        </CardSection>

        {/* Thương hiệu nổi bật */}
        {/* Giới hạn data lấy ra "8" */}
        <CardSection
          title="Thương hiệu nổi bật"
          color="black"
          background="#f5f5f5"
        >
          <div className="flex gap-4">
            {/* <div className="xl:block hidden basis-1/4">
              <img
                src={home_tabs_1_banner}
                alt={home_tabs_1_banner}
                className="h-full w-full object-fill"
              />
            </div> */}
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 mx-auto product-section">
              {dataByBrand.length > 0 &&
                dataByBrand.map((val, key) => (
                  <div
                    key={key}
                    className={`w-full h-full`}
                    onClick={() => setSlug(val.slug)}
                  >
                    <CardProduct {...val} handleOpenModal={handleOpenModal} />
                  </div>
                ))}
            </div>
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default HomePage;
