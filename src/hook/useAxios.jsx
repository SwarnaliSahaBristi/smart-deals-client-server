import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-beta.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
