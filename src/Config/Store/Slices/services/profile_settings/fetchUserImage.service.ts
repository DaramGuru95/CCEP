import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

export const fetchUSerImageService = async (user_id: string | number = "8") => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getUserImage,
      {
        user_id: user_id,
      },
      {
        responseType: "arraybuffer", // Ensure the response is treated as binary data
      }
    );

    const responseData = response.data;
    // const decodedImage = atob(responseData);

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};
