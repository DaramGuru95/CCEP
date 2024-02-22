import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

export  const getCurrentAvailabilityService = async (emp_id: string | null) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getAvailabilityStatus,
      {
        emp_id
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const current_availability = [];
    current_availability.push(
      Number(response.data?.current_availability[0][0])
    );

    const responseData = current_availability;
    // const responseData = response.data?.current_availability[0];

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};



export const postCurrentAvailabilityService = async (
  emp_id: string | null
) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.postAvailabilityStatus,
      {
        emp_id
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const current_availability = [];
    current_availability.push(response.data?.current_availability);

    const responseData = current_availability;

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};


