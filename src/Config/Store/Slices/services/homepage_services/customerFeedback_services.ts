import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getCustomerFeedbackService = async (
  emp_id: string | null,
  designation: string | null
) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.custFeedbackPercent,
      {
        emp_id: `${emp_id}`,
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

export default getCustomerFeedbackService;
