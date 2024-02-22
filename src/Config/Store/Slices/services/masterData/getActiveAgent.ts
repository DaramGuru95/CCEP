import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getActiveAgentService = async () => {
  try {
    const response = await axios.get(
      API_URL_V1 + APIConstants.getActiveAgentsList
    );

    const responseData = response.data;

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default getActiveAgentService;
