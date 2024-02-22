import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const agentEndConversationService = async (conv_session_id: any | null) => {
  try {
    const response = await axios.put(
      API_URL_V1 + APIConstants.endConversation,
      {
        conv_session_id,
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

export default agentEndConversationService;
