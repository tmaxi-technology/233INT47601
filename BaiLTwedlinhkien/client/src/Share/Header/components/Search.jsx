/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { HOST } from "../../Domain/host";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const fakeData = [
  {
    name: "test",
    promotionPrice: "0",
    price: "12312312",
    avt: "https://theme.hstatic.net/1000288298/1001020793/14/cate_feature_6_img.jpg?v=299",
  },
  {
    name: "test",
    promotionPrice: "123130",
    price: "12312312",
    avt: "https://theme.hstatic.net/1000288298/1001020793/14/cate_feature_6_img.jpg?v=299",
  },
  {
    name: "test",
    promotionPrice: "132130",
    price: "12312312",
    avt: "https://theme.hstatic.net/1000288298/1001020793/14/cate_feature_6_img.jpg?v=299",
  },
  {
    name: "test",
    promotionPrice: "1230",
    price: "12312312",
    avt: "https://theme.hstatic.net/1000288298/1001020793/14/cate_feature_6_img.jpg?v=299",
  },
];

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState(fakeData);
  const [closeFocusInput, setCloseFocusInput] = useState(true);
  const [close, setClose] = useState(false);
  const delaySearchTextTimeOut = useRef(null);
  const URL_SEARCH = `${HOST}/search`;

  const onChangeText = (e) => {
    const value = e.target.value;
    setValueSearch(value);
    if (handleSearch) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current);
      }
      delaySearchTextTimeOut.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    }
    setClose(false);
  };

  const handleSearch = (value) => {
    const dataSearch = {
      value: value,
      fildter: "name",
    };
    const query = "?" + queryString.stringify(dataSearch);
    axios
      .get(`${URL_SEARCH}${query}`)
      .then((res) => {
        const data = res.data.result.splice(0, 6);
        setSearchProducts(data);
      })
      .catch((err) => console.log("err search", err));
  };

  const onClickItem = () => {
    setClose(!close);
    setValueSearch("");
  };

  const handleCloseInput = () => {
    setTimeout(() => {
      setCloseFocusInput(false);
    }, 300);
  };

  const handleOpenInput = () => {
    setCloseFocusInput(true);
  };

  // const handleOpen = () => {
  //     setIsOpen(!isOpen);
  // };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const location = useLocation();

  const handleSubmitSearch = () => {
    window.location.href = `/shop/all?search_query=${valueSearch}`;
    location.search = valueSearch;
  };
  return (
    <form
      className={`
          ${
            isActive
              ? "border-2 border-[--header-border-button-search]"
              : "border"
          }
      bg-white p-1 border-solid flex justify-between items-center shadow-sm relative rounded-md container mx-auto 
      `}
      onBlur={handleCloseInput}
      onClick={handleOpenInput}
    >
      <input
        type="search"
        placeholder="Tìm kiếm tên sản phẩm"
        className="input-search"
        aria-label="Search"
        value={valueSearch}
        onChange={onChangeText}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
      <button className="btn-search" onClick={() => handleSubmitSearch()}>
        <AiOutlineSearch />
      </button>
      {
        // Đóng input khi người dùng click outside
        closeFocusInput && (
          <div
            className={`w-full h-full absolute top-0 left-0 transition-all ease-in-out duration-300
                      ${
                        valueSearch.length > 0
                          ? "block z-10 translate-y-[120%]"
                          : "translate-y-[120%] hidden"
                      } 
                      `}
          >
            <div
              className={`product-search-submain bg-white shadow-md overflow-hidden transition-all ease-out`}
            >
              {!close &&
                searchProducts &&
                searchProducts.map((val, idx) => {
                  return (
                    <a
                      className="flex justify-between items-center py-3 px-4 border-b-2 font-medium transition-all ease-in-out text-black hover:text-[--header-hover-text] hover:bg-[--header-hover-items]"
                      key={idx + 1}
                      href={`/detail/${val.slug}`}
                      onClick={onClickItem}
                    >
                      <div>
                        <p className="uppercase">{val.name}</p>
                        <p>
                          {val.amount
                            ? parseInt(val.amount).toLocaleString()
                            : parseInt(val.price).toLocaleString()}
                          ₫
                        </p>
                      </div>
                      <div className="h-10 w-10">
                        <img
                          src={val.image}
                          alt={val.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </a>
                  );
                })}
              {!close &&
                (searchProducts.length > 0 ? (
                  <div className="text-center py-3 px-4">
                    {/* onClick={onClickItem} */}
                    <a href="/collections/all">
                      Xem Thêm...
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-3 px-4">
                    <p>Không có sản phẩm nào!</p>
                  </div>
                ))}
            </div>
          </div>
        )
      }
    </form>
  );
};

export default Search;
