import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getCustomer360 = async (conv_session_id: any | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.customer360,
      {
        conv_session_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data?.customer360;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default getCustomer360;
