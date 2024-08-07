/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import EditProfileUser from './EditProfileUser';

const Address = ({ infor }) => {
    // console.log("infor", infor);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const openEditProfile = () => {
        setOpenModalEdit(true)
    }
    const closeEditProfile = () => {
        setOpenModalEdit(false)
    }
    return (
        <div className="w-full lg:w-3/4 ml-auto">
            <div className='bg-[#d9edf7] rounded-t-md text-black p-2 flex justify-between items-center'>
                <p className='font-semibold'>
                    Thông tin người dùng
                </p>
                <button onClick={openEditProfile}>
                    <AiOutlineEdit color='black' className='font-bold text-lg' />
                </button>
            </div>
            <div className='p-2 bg-white rounded-b-md'>
                {infor.username}
                <ul>
                    <li className='flex items-center'>
                        <p className='font-semibold basis-1/3'>email:</p> <span className='basis-3/4'>{infor.email ?? "Không có"}</span>
                    </li>
                    <li className='flex items-center'>
                        <p className='font-semibold basis-1/3'>Địa chỉ:</p> <span className='basis-3/4'>{infor.address ?? "Chưa có địa chỉ giao hàng"}</span>
                    </li>
                    <li className='flex items-center'>
                        <p className='font-semibold basis-1/3'>Số điện thoại:</p> <span className='basis-3/4'>{infor.phone ?? "Chưa có số điện thoại"}</span>
                    </li>
                </ul>
            </div>
            <div className={`${openModalEdit ? "block" : "hidden"} fixed top-0 left-0 w-screen h-screen z-40 backdrop-blur-sm`} />
            {
                openModalEdit && <EditProfileUser onClose={closeEditProfile} infor={infor} />
            }
        </div>
    )
}

export default Address