import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

const getMasterDataService = async (types: any | null) => {
  try {
    const { data_type, data_sub_type } = types;
    const response = await axios.post(
      API_URL_V1 + APIConstants.getMasterData,
      {
        data_type,
        data_sub_type,
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

export default getMasterDataService;
