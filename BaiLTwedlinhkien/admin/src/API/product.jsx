import axiosClient from "./axiosClient";

const Product = {
  getAll: (filter) => {
    var url = "product";
    if (filter) {
      url += filter;
    }
    return axiosClient.get(url);
  },
  getById: (id) => {
    var url = "product" + "/" + id;
    return axiosClient.get(url);
  },
  delete: (id) => {
    var url = "product" + "/" + id;
    return axiosClient.delete(url);
  },
  create: (data) => {
    const url = "product";
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    var url = "product" + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default Product;
