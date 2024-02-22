import { InternalAxiosRequestConfig } from "axios";

const interceptor = (request : InternalAxiosRequestConfig<any>) => {
    request.data = JSON.stringify(request.data)
    return request;
}

export default interceptor;