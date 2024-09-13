import axiosInstance from "../config/axiosConfig";

export const axiosHandler = async (
  endpoint,
  method = "get",
  data = null,
  token = ""
) => {
  try {
    if (!token) {
      token = localStorage.getItem("u-enypt-token") || "";
    }
    if (endpoint == "video/cut-thumbnail-video" ||endpoint == "video/compress-video" || endpoint=='video/upload-image-user') {
      axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data; charset=UTF-8";
    } else {
      axiosInstance.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";
    }
    if (token) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers["Authorization"];
    }
    const response = await axiosInstance({
      url: `/v1/${endpoint}`,
      method,
      data,
    });
    return response;
  } catch (error) {

    throw error;
  }
};

export const Client = {
  get: async (url, data = null, token = null) => {
    try {
      return await axiosHandler(url, "get", data, token);
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = null, token = null) => {
    try {
      return await axiosHandler(url, "post", data, token);
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = null, token = null) => {
    try {
      return await axiosHandler(url, "put", data, token);
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, data = null, token = null) => {
    try {
      return await axiosHandler(url, "delete", data, token);
    } catch (error) {
      throw error;
    }
  },
};
