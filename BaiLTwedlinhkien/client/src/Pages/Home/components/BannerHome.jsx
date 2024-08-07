import home_group_banner1 from "../../../assets/home_group_banner_1_img.png"
import home_group_banner2 from "../../../assets/home_group_banner_2_img.png"
import home_group_banner3 from "../../../assets/home_group_banner_3_img.png"
import home_group_banner4 from "../../../assets/home_group_banner_4_img.png"
const BannerHome = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 p-4">
            <div className="relative rounded-md overflow-hidden effect-shine">
                <img className="w-full h-full object-cover" src={home_group_banner1} alt={home_group_banner1} />
            </div>
            <div className="relative rounded-md overflow-hidden effect-shine">
                <img className="w-full h-full object-cover" src={home_group_banner2} alt={home_group_banner2} />
            </div>
            <div className="relative rounded-md overflow-hidden effect-shine">
                <img className="w-full h-full object-cover" src={home_group_banner3} alt={home_group_banner3} />
            </div>
            <div className="relative rounded-md overflow-hidden effect-shine">
                <img className="w-full h-full object-cover" src={home_group_banner4} alt={home_group_banner4} />
            </div>
        </div>
    )
}

export default BannerHome