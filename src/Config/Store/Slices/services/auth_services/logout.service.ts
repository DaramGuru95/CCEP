import axios from "axios";
import APIConstants, {
  API_URL_V1,
  API_URL_V4,
} from "../../../../../Constants/apiConstants";

export const logoutApi = async (agent_id: string | null) => {
  try {
    const response: any = await axios.put(
      API_URL_V1 + APIConstants.logout,
      {
        agent_id,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error: any) {
    throw error.response.data.error;
  }
};
