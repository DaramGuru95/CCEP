import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getTodayTicketService = async (emp_id: string | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.todayTicketStatus,
      {
        emp_id: `${emp_id}`,
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

export default getTodayTicketService;
