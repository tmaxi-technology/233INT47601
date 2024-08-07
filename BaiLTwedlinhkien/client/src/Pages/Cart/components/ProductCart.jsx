/* eslint-disable react/prop-types */
import React, { useState } from "react";
import product from "../../../assets/imgproduct.png";
import { FaRegTrashAlt } from "react-icons/fa";
import Carts from "../../../API/carts";
import { formatNumberWithCommas } from "../../../Share/utils";

const ProductCart = ({ data }) => {
  console.log("data", data);
  const [count, setCount] = useState(data.quantity);

  const deleteProduct = async (id) => {
    console.log("delete", id);
    const user_id = sessionStorage.getItem("iduser");
    const response = await Carts.deleteProductInCart(id, user_id);
    if (response.data.sucess) {
      window.location.reload();
    }
  };
  return (
    <div className="flex items-center gap-4 border-2 overflow-hidden py-3 px-4 rounded-lg mb-3">
      <button
        onClick={() => deleteProduct(data.id)}
        className="hover:text-white text-black hover:bg-black p-1 rounded-md transition-all duration-300 ease-linear delay-75"
      >
        <FaRegTrashAlt />
      </button>
      <div className="max-w-20 flex-shrink-0 flex-grow-0 basis-20">
        <img
          src={data.image}
          alt="product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="basis-auto flex-shrink flex-row px-4">
        <p className="line-clamp-1 text-ellipsis">{data.name}</p>
        <span className="font-semibold text-gray-400">
          {data.amount
            ? formatNumberWithCommas(data.amount)
            : formatNumberWithCommas(data.price)}
          đ
        </span>
      </div>
      <div className="space-y-2">
        <span>
          <b>{formatNumberWithCommas(data.totalprice)}đ</b>
        </span>
        <div className="flex items-center">
          {/* <button
            disabled={count === 1 ? true : false}
            className={`${count === 1 ? "bg-gray-200" : ""}
    text-center text-xl hover:font-bold hover:bg-gray-200 text-black border h-8 w-8`}
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button> */}
          <p className="h-8 w-8 text-sm text-center">SL: {count}</p>
          {/* <button
            className="text-center text-xl hover:font-bold hover:bg-gray-200 text-black border h-8 w-8"
            onClick={() => setCount(count + 1)}
          >
            +
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
