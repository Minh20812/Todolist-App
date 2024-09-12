import axios from "axios";
import queryString from "query-string";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: "",
    Accept: "application/json",
    ...config.headers,
  };
  config.data;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response?.data || error.message);
  }
);

export default axiosClient;
