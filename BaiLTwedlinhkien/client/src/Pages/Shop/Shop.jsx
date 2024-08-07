/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
// import FilterPrice from "./components/FilterPrice"
import ListCategories from "./components/ListCategories";
// import ListSupplier from "./components/ListSupplier"
import banner from "../../assets/collection_banner_all.png";
import CardCollection from "../../Components/CardCollection";
import CardProduct from "../../Components/CardProduct";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
// import SortPrice from "./components/SortPrice"
import { Link, useNavigate, useParams } from "react-router-dom";
import Products from "../../API/Products";
import axiosClient from "../../API/axiosClient";
import { toast } from "react-toastify";
import PopupDetailProduct from "../../Components/PopupDetailProduct";
const Shop = () => {
  const [openListCate, setOpenListCate] = useState(false);
  const [openListItems, setOpenListItems] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState("");

  const onOpenCategories = () => {
    setOpenListCate(!openListCate);
  };
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  let navigate = useNavigate();
  let { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/collections") {
      navigate("/collections/all", { replace: true });
    }
    const fetchData = async () => {
      if (id === "all") {
        const response = await axiosClient
          .get(`product?limit=100`)
          .then((res) => res.data);
        setDataProducts(response.results.list);
      } else {
        const response = await axiosClient
          .get(`product?${id}&limit=100`)
          .then((res) => res.data);
        const product = response.results.list;
        setDataProducts(product);
      }
    };
    fetchData();
  }, [limit]);

  const loadMoreProduct = async () => {
    await axiosClient
      .get(`product?limit=${limit}&offset=${dataProducts.length}`)
      .then((res) => res.data)
      .then((data) =>
        setDataProducts((prev) => [...prev, ...data.results.list])
      )
      .catch((err) => {
        console.log(err);
      });
  };

  // const onOpenFilterPrice = () => {
  //     setOpenFilterPrice(!openFilterPrice)
  // }

  const onOpenListItems = () => {
    setOpenListItems(!openListItems);
  };

  // const onOpenSortPrice = () => {
  //     setOpenSortPrice(!openSortPrice)
  // }
  return (
    <div className="">
      <BreadCrumbs>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "text-black pr-2" : "text-gray-500 pr-2"
          }
        >
          Trang chủ
        </Link>
        /<p className="text-black pr-2">Tất cả sản phẩm</p>
      </BreadCrumbs>
      <div className="container mx-auto">
        <div className="flex gap-x-4">
          <div className="basis-1/4 lg:block hidden">
            <div className="flex flex-col gap-4">
              <ListCategories
                onOpen={openListCate}
                onClose={onOpenCategories}
              />
              {/* <ListSupplier onOpen={openListSupplier} onClose={onOpenSupplier} />
                            <FilterPrice onOpen={openFilterPrice} onClose={onOpenFilterPrice} /> */}
            </div>
          </div>
          <div className="lg:basis-3/4 basis-full">
            <div className="rounded-md overflow-hidden">
              <img
                src={banner}
                alt="banner"
                className="h-full w-full object-cover"
              />
            </div>
            <CardCollection
              title="Tất cả sản phẩm"
              total={dataProducts.length}
              onClose={onOpenListItems}
              loadMore={loadMoreProduct}
            >
              <div className="flex flex-col gap-4">
                {dataProducts.length > 0 ? (
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 mx-auto product-collection">
                    {dataProducts &&
                      dataProducts.map((val, key) => (
                        <div
                          key={key}
                          className={`w-full`}
                          onClick={() => setSlug(val.slug)}
                        >
                          <CardProduct
                            {...val}
                            handleOpenModal={handleOpenModal}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-black">
                    Chưa có sản phẩm nào trong danh mục này..
                  </div>
                )}
              </div>
            </CardCollection>
          </div>
        </div>
      </div>
      {openListItems ? (
        <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-[--shop-bg-button-light] text-[--shop-text-black] z-50">
          <div className="flex justify-between items-center text-[--shop-text-white] bg-[--shop-bg-button] px-2 py-3">
            <p className="text-xl font-bold flex gap-x-2 items-center">
              <FaFilterCircleDollar /> Bộ lọc
            </p>
            <button
              className="text-[--shop-text-white]"
              onClick={onOpenListItems}
            >
              <AiOutlineClose fontSize={25} />
            </button>
          </div>
          <div className="p-2">
            <div className="flex flex-col">
              <ListCategories
                onOpen={openListCate}
                onClose={onOpenCategories}
              />
              {/* <ListSupplier onOpen={openListSupplier} onClose={onOpenSupplier} />
                                <FilterPrice onOpen={openFilterPrice} onClose={onOpenFilterPrice} />
                                <SortPrice onClose={onOpenSortPrice} onOpen={openSortPrice} /> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* open modal detail product */}
      {isOpen && <PopupDetailProduct slug={slug} onClose={handleOpenModal} />}
    </div>
  );
};

export default Shop;
