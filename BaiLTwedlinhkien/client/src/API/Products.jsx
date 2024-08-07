import axiosClient from "./axiosClient";

const Products = {
  getAllProduct: (filter) => {
    if (filter) {
      const url = `product${filter}`;
      return axiosClient.get(url);
    }
    const url = `product`;
    return axiosClient.get(url);
  },
  getDetailBySlug: (id) => {
    const url = `product/slug/${id}`;
    return axiosClient.get(url);
  },
};

export default Products;
