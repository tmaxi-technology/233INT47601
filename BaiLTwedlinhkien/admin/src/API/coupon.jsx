import axiosClient from "./axiosClient";

const name = "coupons";

const Coupon = {
  getAll: (filter) => {
    var url = name;
    if (filter) {
      url += filter;
    }
    return axiosClient.get(url);
  },
  getById: (id) => {
    var url = name + "/" + id;
    return axiosClient.get(url);
  },
  delete: (id) => {
    var url = name + "/" + id;
    return axiosClient.delete(url);
  },
  create: (data) => {
    const url = name;
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    var url = name + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default Coupon;
