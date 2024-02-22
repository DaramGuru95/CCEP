import { AxiosResponse } from "axios";

const interceptor = (response: AxiosResponse<any>) => {
  if (typeof response.data === "string") {
    response.data = JSON.parse(response.data);
  }
  return response;
};

export default interceptor;
