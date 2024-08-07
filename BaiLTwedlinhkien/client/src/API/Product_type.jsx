import axiosClient from "./axiosClient"
const Product_type = {
    getProductTypeById: (id) => {
        const url = `type/${id}`
        return axiosClient.get(url)
    }
}

export default Product_type