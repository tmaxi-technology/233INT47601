import axiosClient from "./axiosClient";

const User = {
  getAll: (filter) => {
    var url = "users";
    if (filter) {
      url += filter;
    }
    return axiosClient.get(url);
  },
  logIn: (data) => {
    const url = "login";
    return axiosClient.post(url, data);
  },
  getById: (id) => {
    var url = "users" + "/" + id;
    return axiosClient.get(url);
  },
  delete: (id) => {
    var url = "users" + "/" + id;
    return axiosClient.delete(url);
  },
  create: (data) => {
    const url = "register";
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    var url = "users" + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default User;
