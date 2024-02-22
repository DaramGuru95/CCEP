import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";
import { getCurrentDate } from "../../../../../Helpers/commonHelper";

const getConversationStatService = async (emp_id: string | null) => {
  try {
    const response = await axios.get(
      API_URL_V1 +
        APIConstants.getConversationStatistics +
        `?emp_id=${emp_id}&conv_statistics_date=${getCurrentDate()}`
    );

    const responseData = response.data;

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default getConversationStatService;
