import { AiFillHome, AiFillPhone, AiFillMail, AiFillClockCircle } from "react-icons/ai"
function Footer() {
    return (
        <footer className="text-[--footer-text-main]">
            <div className="bg-[--footer-bg-form] w-full px-4">
                <div className="container mx-auto flex lg:flex-row flex-col gap-5 justify-center items-center w-full py-4">
                    <div className="lg:text-end text-center lg:basis-1/2 basis-full text-white">
                        <h3 className="font-bold text-2xl">Liên hệ chúng tôi</h3>
                        <p>
                            Chúng tôi rất cảm ơn quý khách đã đóng góp ý kiến
                        </p>
                    </div>
                    <form
                        className={`lg:basis-1/2 basis-full w-full border-2 border-[--footer-border-input] bg-[--footer-bg-input] p-1 border-solid flex justify-between items-center shadow-sm rounded-md`}
                    >
                        <input
                            type="search"
                            placeholder="Nhập nội dung ở đây..."
                            className="input-search"
                            aria-label="Search"
                        />
                        <button
                            className="py-2 px-6 uppercase basis-1/3 bg-[--footer-bg-button] text-[--footer-text] font-medium rounded-md"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
            <div className="p-4">
                <div className="text-sm container mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 py-5">
                    <div className="my-3">
                        <h6 className="font-bold uppercase mb-3">Về B.N SHOP</h6>
                        <p>Trang thương mại chính thức của B.N SHOP - Trực Tiếp Game. Luôn tìm kiếm những sản phẩm vì game thủ.</p>
                    </div>
                    <div className="my-3">
                        <h6 className="font-bold mb-3">Thông tin liên hệ</h6>
                        <ul className="space-y-2">
                            <li className="flex gap-3 items-center"><AiFillHome size={20} /> 64 đường Võ Công Tồn - Q.Tân Phú - TP.HCM.</li>
                            <li className="flex gap-3 items-center"><AiFillPhone size={20} />Số điện thoại: 0903 25 10 99 - 0909 340 199</li>
                            <li className="flex gap-3 items-center"><AiFillMail size={20} /> nguyen25101999@gmail.com</li>
                            <li className="flex gap-3 items-center"><AiFillClockCircle size={20} />Thời gian mở của: 8:30 - 21:30</li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <h6 className="font-bold uppercase mb-3">Hỗ trợ khách hàng</h6>
                        <ul className="list-disc pl-4">
                            <li>Tài Khoản Ngân Hàng</li>
                            <li>Tìm Kiếm</li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <h6 className="font-bold uppercase mb-3">Chính sách</h6>
                        <ul className="list-disc pl-4">
                            <li>Chính Sách Bảo Mật</li>
                            <li>Qui Định Bảo Hành</li>
                            <li>Chính Sách Đổi Trả</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex py-4 gap-3 justify-center w-full ">
                <div className="">
                    <p className="">&copy; 2024 All rights reserved.</p>
                </div>
                <div className="text-center">
                    <p className="">B.N SHOP</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;