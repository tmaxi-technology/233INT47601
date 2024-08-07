import axiosClient from "./axiosClient";

const Categories = {

    getAllCategories: (filter) => {
        if(filter){
            const url = `cate${filter}`
            return axiosClient.get(url)
        }
        const url = "cate"
        return axiosClient.get(url)
    },

    getItemsChildrenCategories: () => {
        const url = "type?limit=1000"
        return axiosClient.get(url)
    }
}

export default Categories