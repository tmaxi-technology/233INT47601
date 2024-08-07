import banner_1 from "../../../assets/banner_top_1_img_large.png"
import banner_2 from "../../../assets/banner_top_2_img_large.png"
import banner_3 from "../../../assets/banner_top_3_img_large.png"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

const Slides = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024)

        }
        checkMobile();

        window.addEventListener('resize', () => checkMobile())

        return () => {
            window.removeEventListener("resize", () => checkMobile())
        }
    }, []);
    return (

        <div className="lg:basis-2/6 basis-full flex flex-row lg:flex-col gap-4 lg:max-w-[33%] max-w-full">
            {
                !isMobile ? (
                    <>
                        <div className="relative effect-shine overflow-hidden rounded">
                            <img src={banner_1} alt={banner_1} className="h-full w-full object-cover" />
                        </div>
                        <div className="relative effect-shine overflow-hidden rounded">
                            <img src={banner_2} alt={banner_2} className="h-full w-full object-cover" />
                        </div>
                        <div className="relative effect-shine overflow-hidden rounded">
                            <img src={banner_3} alt={banner_3} className="h-full w-full object-cover" />
                        </div>
                    </>
                ) : <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    <SwiperSlide className="overflow-hidden rounded-lg">
                        <img src={banner_1} alt={banner_1} className="h-full w-full object-scale-down" />
                    </SwiperSlide>
                    <SwiperSlide className="overflow-hidden rounded-lg">
                        <img src={banner_2} alt={banner_2} className="h-full w-full object-scale-down" />
                    </SwiperSlide>
                    <SwiperSlide className="overflow-hidden rounded-lg">
                        <img src={banner_3} alt={banner_3} className="h-full w-full object-scale-down" />
                    </SwiperSlide>
                </Swiper>
            }

        </div>

    )
}

export default Slides