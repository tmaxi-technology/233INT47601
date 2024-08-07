/* eslint-disable react/prop-types */
import { MdOutlineShoppingBag } from "react-icons/md";
import {formatNumberWithCommas} from "../Share/utils"
const CardProduct = ({ slug, code, image, name, price, pricePromotion, discountPercent, quantity, handleOpenModal }) => {

    return (
        <div className="px-1 py-3 rounded-md bg-[--card-product-bg] product-inner">
            <div className={`product--image my-4 w-full mx-auto`}>
                <a href={`/detail/${slug}`}>
                    <img src={image &&image.split(",")[0]} alt={name} className="h-full w-full object-cover" />
                </a>
            </div>
            <div className="product--detail px-2 md:px-4 pt-3">
                <a href={`/detail/${slug}`} className="font-medium line-clamp-2 text-wrap text-sm text-[--card-product-text-name] min-h-10">
                    {name} - {code}
                </a>
                <div className="flex justify-between items-center py-4 min-h-20 lg:text-base text-sm">
                    <p className="text-[--card-product-text-price] font-bold">
                        {pricePromotion ? pricePromotion : formatNumberWithCommas(price)}₫
                        <span className={`font-light text-black ${pricePromotion ? "block" : "hidden"}`}>
                            <del>{formatNumberWithCommas(price)}₫</del>
                        </span>
                    </p>
                    <p className={`${discountPercent ? "block" : 'hidden'} px-2 text-sm bg-[--card-product-bg-discount] text-[--card-product-text-discount]`}>
                        {discountPercent}%
                    </p>
                </div>
                <div className="product-buttons">
                    <a href={`/detail/${slug}`} disabled={!quantity ? true : false} className={`flex items-center gap-2 font-semibold text-xs outline-none text-[--card-product-text] ease-in duration-500 transition-all uppercase
                     ${!quantity ? " bg-gray-500 w-full rounded-full text-white" : "hover:bg-[--card-product-hover-bg] hover:w-fit w-auto hover:pr-3 hover:rounded-full hover:text-[--card-product-hover-text]"}
                     `}>
                        <span className="bg-[--card-product-bg-button] text-xl text-[--card-product-hover-text] p-2 rounded-full">
                            <MdOutlineShoppingBag />
                        </span>
                        <span className="text-[10px] md:text-sm font-bold">
                            {!quantity ? "Hết hàng" : "Thêm giỏ hàng"}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardProduct