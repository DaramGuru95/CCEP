import axios from "../Config/Axios";

export const doPOST = async (url: string, request: any, headers?: any) => {
  try {
    const response = await axios.post(url, request, headers);
    return response;
  } catch (error) {
    throw error;
  }
};
