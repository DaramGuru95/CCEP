import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getAgentCustFeedbackService = async (conv_session_id: string | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getAgentConvStatsOnFeedback,
      {
        conv_session_id,
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

export default getAgentCustFeedbackService;

export const sendAgentCustFeedbackService = async (
  conv_session_id: string | null,
  formData: any | null
) => {
  try {
    const { status, selectedRating, remarks, resolve, reason } = formData;
    let rating: any = "";
    if (selectedRating == "neutral") {
      rating = 5;
    } else if (selectedRating == "positive") {
      rating = 10;
    } else {
      rating = 1;
    }
    const response = await axios.post(
      API_URL_V1 + APIConstants.agentFeedback,
      {
        conv_session_id,
        reason_for_calling: reason,
        query_resolved: resolve,
        feedback_rating_for_cust: rating,
        remarks_for_cust: "None",
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
