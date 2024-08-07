/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Categories from "../../../API/Categories"
import { useEffect } from "react"

const ListCategories = ({ onOpen, onClose }) => {
    const [title, setTitle] = useState("")
    const [showItems, setShowItems] = useState(false)

    const [dataCategory, setDataCategory] = useState([])
    const [dataChildrenCate, setDataChildrenCate] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const category = await Categories.getAllCategories().then(res => res.data)
            if (category.results) {
                setDataCategory(category.results.list)
            }

            const product_type = await Categories.getItemsChildrenCategories().then(res => res.data)
            if (product_type.results) {
                setDataChildrenCate(product_type.results.list)
            }
        }
        fetchData()
    }, [])

    // Gộp mảng dựa trên id và category_id
    const mergeArray = dataCategory.map(item1 => {
        const matchingItem = dataChildrenCate.filter(item2 => item2.category_id === item1.id)
        // nếu có phần tử trùng khớp, tạo 1 object mới với phần tử khớp sẽ nằm ở trong items
        if (matchingItem.length > 0) {
            return {
                ...item1,
                items: matchingItem
            }
        }
        // Nếu không có phần tử khớp, trả về item1 không thay đổi
        return item1
    })
    const handleShowitems = (title, items) => {
        if (items.length) {
            setTitle(title)
            setShowItems(!showItems)
        }
    }
    return (
        <div className="">
            <div>
                <button onClick={onClose} className="flex justify-between items-center w-full gap-x-1.5 rounded-md bg-[--shop-bg-button-light] px-3 py-3 text-base font-bold text-gray-900 shadow-sm lg:border-2 border-b-2 hover:bg-gray-50">
                    Danh mục sản phẩm
                    <FaChevronDown className={`-mr-1 h-5 w-5 text-gray-400 transition-all duration-300 ease-linear 
                        ${onOpen ? "rotate-180" : "rotate-0"}
                    `} aria-hidden="true" />
                </button>
            </div>
            <div className={` ${!onOpen ? "block h-full" : "hidden h-0"} transition-all ease-linear duration-300 `}>
                <div className="w-full z-10 origin-top-right lg:rounded-b-md rounded-none bg-[--shop-bg-button-light] lg:shadow-lg shadow-none lg:border border-none focus:outline-none"
                >
                    <div className="py-1">
                        <ul className="">
                            {
                                mergeArray && mergeArray.map(((val, key) => (
                                    <li key={key} className={`px-4 py-2 text-sm`}>
                                        {
                                            val.items ? (
                                                <button onClick={() => handleShowitems(val.name, val.items)} className="flex justify-between items-center w-full text-gray-700">
                                                    {val.name}
                                                    <span className={`${val.items ? "block" : "hidden"} text-md font-bold`}>
                                                        {"-"}
                                                    </span>
                                                </button>
                                            ) : (
                                                <a href={`category_id=${val.id}`} className="flex justify-between items-center w-full text-gray-700">
                                                    {val.name}
                                                </a>
                                            )
                                        }
                                        {
                                            showItems && title === val.name &&
                                            <ul className={`w-full px-5 py-1 text-sm text-gray-600 transition-all duration-300 ease-in-out delay-1000 
                                            ${showItems && val.items && title === val.name ? "h-full" : "h-0"}
                                            `}>
                                                {
                                                    mergeArray.filter((categories) => categories.name === title).map((val) => (
                                                        val.items.map((item, key) => (
                                                            <li key={key} className="py-2 w-full">
                                                                <a href={`product_type_id=${item.id}`}>
                                                                    <i>
                                                                        {item.name}
                                                                    </i>
                                                                </a>
                                                            </li>
                                                        ))
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </li>
                                )))
                            }

                        </ul >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default ListCategories