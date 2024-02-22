import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

export const userDetailsApi = async (user_id: string) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getUserDetials,
      {
        user_type: "agent",
        user_id: user_id,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error || "Image upload failed";
  }
};
