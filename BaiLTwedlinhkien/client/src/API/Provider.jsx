import axiosClient from "./axiosClient"
const Provider = {
    getProviderById: (id) => {
        const url = `provider/${id}`
        return axiosClient.get(url)
    }
}

export default Provider