import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getLogsAService = async (user_id: string | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.agentConvLogs,
      {
        user_id,
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
    console.log(error.response?.data?.error,"error.response?.data?.error");
    
    throw error.response?.data?.error;
  }
};

export default getLogsAService;
