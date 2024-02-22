import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const acticeSessionsService = async (
  agent_id: string | null,
  function_code: string | null,
  designation: string | null
) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getActiveSessions,
      {
        agent_id,
        function_code,

        designation,
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

export default acticeSessionsService;
