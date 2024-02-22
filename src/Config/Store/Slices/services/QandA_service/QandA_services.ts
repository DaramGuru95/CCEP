import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getQandAService = async (emp_id: string | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getFAQForAgent,
      {
        user_id: emp_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default getQandAService;
