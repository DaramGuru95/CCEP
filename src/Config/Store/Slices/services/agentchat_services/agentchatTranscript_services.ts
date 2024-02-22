import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const agentChatTranscriptService = async (
  conv_session_id: any | null,
  function_code: any | null
) => {
  try {
    const response = await axios.get(
      API_URL_V1 +
        APIConstants.getConversationHistoryResponse +
        `?conv_session_id=${conv_session_id}&function_code=${function_code}`
    );

    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default agentChatTranscriptService;
