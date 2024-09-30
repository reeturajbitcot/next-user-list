import axios from "axios";

const APIROUTE =
  "https://mern-admin-backend-jxw3.onrender.com/general/employee";

export const handleFetchContent = async ({ pageNo = 1, limit }) => {
  try {
    const res = await axios({
      method: "get",
      url: `${APIROUTE}s?pageNumber=${pageNo}&limit=${limit}`,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || "error occurred";
  }
};

export const handleLogin = async ({ data }) => {
  try {
    const response = await axios({
      method: "post",
      url: `${APIROUTE}/login`,
      data,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || "error occurred";
  }
};

export const handleSignUp = async ({ data }) => {
  try {
    const response = await axios({
      method: "post",
      url: `${APIROUTE}/add`,
      data,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || "error occurred";
  }
};

export const handleDeleteUser = async ({ id }) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${APIROUTE}/delete/${id}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || "error occurred";
  }
};

export const handleUserUpdate = async ({ data, id }) => {
  try {
    const response = await axios({
      method: "put",
      url: `${APIROUTE}/update/${id}`,
      data,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || "error occurred";
  }
};
