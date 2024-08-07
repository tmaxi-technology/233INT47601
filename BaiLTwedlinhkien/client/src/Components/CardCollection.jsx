
/* eslint-disable react/prop-types */
import { FaFilterCircleDollar } from "react-icons/fa6";
import SortPrice from "../Pages/Shop/components/SortPrice";
import { useState } from "react";
const CardCollection = ({ children, title, total, onClose, loadMore }) => {
    const [openSortPrice, setOpenSortPrice] = useState(false)
    const onOpenSortPrice = () => {
        setOpenSortPrice(!openSortPrice)
    }
    return (
        <div className={`p-5 rounded-md mt-5`}>
            <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-bold text-black">
                    {title}
                    <span className="text-sm pl-2">
                        {total} sản phẩm
                    </span>
                </h3>
                <div className="lg:block hidden basis-1/4">
                    <SortPrice onClose={onOpenSortPrice} onOpen={openSortPrice} />
                </div>
                <button onClick={onClose} className="text-black flex items-center gap-x-2 py-2 px-4 rounded-full border border-gray-400 hover:bg-black hover:text-white lg:hidden transition-all duration-300 ease-linear">
                    Bộ lọc <FaFilterCircleDollar />
                </button>
            </div>
            <div className="py-4">
                {children}
            </div>
            {
                total ?
                    <div className="w-full text-center">
                        <button onClick={loadMore} className={`relative overflow-hidden z-20 px-4 py-3 text-sm border rounded-md bg-white text-black font-medium effect-button transition-all ease-linear`}>
                            Xem thêm sản phẩm
                        </button>
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default CardCollection