import axiosClient from "./axiosClient";

const Carts = {
  addToCart: (data) => {
    const url = `carts`;
    return axiosClient.post(url, data);
  },
  getAll: (id) => {
    var url = `carts/${id}`;
    return axiosClient.get(url);
  },
  getCartByIdUser: (id) => {
    var url = `carts/${id}`;
    return axiosClient.get(url);
  },
  clear: (id) => {
    var url = `carts/${id}`;
    return axiosClient.delete(url);
  },
  deleteProductInCart: (pid, uid) => {
    const data = {
      pid: pid,
      uid: uid,
    };
    var url = `carts/delete/product`;
    return axiosClient.post(url, data);
  },
};

export default Carts;
