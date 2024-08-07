import axiosClient from "./axiosClient"


const ColorSize = {
    getColorSizeById: (id) => {
        const url = `color/${id}`
        return axiosClient.get(url)
    }
}

export default ColorSize