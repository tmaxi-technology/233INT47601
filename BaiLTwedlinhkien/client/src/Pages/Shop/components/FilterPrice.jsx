/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { dataFilerPrice } from "../../../Share/dataFake"
const FilterPrice = ({ onOpen, onClose }) => {

    const [value, setValue] = useState("")
    const onChangeInput = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <div>
                <button onClick={onClose} className="flex justify-between w-full gap-x-1.5 rounded-md bg-white px-3 py-3 text-base font-bold text-gray-900 shadow-sm lg:border-2 border-b-2 hover:bg-gray-50">
                    Lọc giá
                    <FaChevronDown className={`-mr-1 h-5 w-5 text-gray-400 transition-all duration-300 ease-linear 
                        ${onOpen ? "rotate-180" : "rotate-0"}
                    `} aria-hidden="true" />
                </button>
            </div>
            <div className={` ${!onOpen ? "block h-full" : "hidden h-0"} transition-all ease-linear duration-300 `}>
                <div className="w-full z-10 origin-top-right lg:rounded-b-md rounded-none bg-white lg:shadow-lg shadow-none lg:border border-none focus:outline-none">
                    <div className="py-1">
                        <ul>
                            {
                                dataFilerPrice && dataFilerPrice.map((val, key) => (
                                    <li className="relative flex items-center w-full text-gray-700 px-4 py-2 text-sm" key={key}>
                                        <input id={val.name} type="checkbox" value={value} onChange={onChangeInput}
                                            className="
                                                w-4 h-4
                                                appearance-none
                                                ring-gray-300
                                                rounded-sm
                                                ring-1
                                                hover:ring-[#a2630ab6]
                                                checked:bg-[#a2630ab6]
                                                bg-center
                                                bg-no-repeat
                                                bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')]
                                                "/>
                                        <label htmlFor={val.name} className="ml-3 cursor-pointer w-full">
                                            <p>
                                                {val.name}
                                            </p>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPrice