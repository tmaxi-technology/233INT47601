import axiosClient from "./axiosClient";

const Coupons = {

    getAllCoupons: () => {
        const url = "coupons"
        return axiosClient.get(url)
    },
    getCouponById: (id) => {
        const url = `coupons/${id}`
        return axiosClient.get(url)
    }
}

export default Coupons