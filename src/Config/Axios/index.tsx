import axios from "axios";
import developmentConfig from "../../development.json";
import baseRequestInterceptor from "./RequestInterceptors/baseRequestInterceptor";
import baseResponseInterceptor from "./ResponseInterceptor/baseResponseInterceptor"

const axiosInstance = axios.create({
    baseURL : process.env.NODE_ENV ===  'development' ? developmentConfig.url : window.location.origin
})

//base interceptors request -> string & vice versa
axiosInstance.interceptors.request.use(baseRequestInterceptor);
axiosInstance.interceptors.response.use(baseResponseInterceptor);

export default axiosInstance;

