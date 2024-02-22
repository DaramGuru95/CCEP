import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";
import { getLocalStorage } from "../../../../../Helpers/commonHelper";

const transferChatService = async (
  body: any | null,
  agent_id: string | null,
  function_code: string | null
) => {
  try {
    const { reason, assigned_to, product, sub_product, category, remarks } =
      body;
    const customer_id = getLocalStorage("selected_customer");
    const conv_session_id = getLocalStorage("conv_session_id");
    const cur_emp_id = agent_id;
    const response = await axios.post(
      API_URL_V1 + APIConstants.transferChat,
      {
        customer_id,
        conv_session_id,
        cur_emp_id,
        reason,
        assigned_to,
        product,
        sub_product,
        category,
        remarks,
        function_code,
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

export default transferChatService;
