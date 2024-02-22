import axios from "axios";
import APIConstants, {
  API_URL_V4,
} from "../../../../../Constants/apiConstants";

export const loginApi = async (username: string, password: string) => {
  try {
    const response: any = await axios.post(
      API_URL_V4 + APIConstants.login,
      {
        username,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;

    // if(!response.ok){
    //   throw new Error("Something went wrong !")
    // }
    // else {
    //   return response.json()
    // }
   
    
  } catch (error: any) {
    throw error.response.data.error;
  }
};
