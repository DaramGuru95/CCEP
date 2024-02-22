import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";
import { TicketState } from "../../reducers/ticket_reducers/createTicket_reducer";

export const createTicketService = async (postTicketDetails: any) => {
  try {
    const formData = new FormData();
    for (const key in postTicketDetails) {
      if (Object.hasOwnProperty.call(postTicketDetails, key)) {
        if (key === "pdf") {
          const file = await fetch(postTicketDetails["pdf"]);
          if (postTicketDetails[key]) {
            const blob = await file.blob();
            formData.append("pdf", blob);
          } else {
            formData.append("pdf", "");
          }
        } else {
          formData.append(key, postTicketDetails[key]);
        }
      }
    }
    const response = await axios.post(
      API_URL_V1 + APIConstants.ticket,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const responseData = response;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error || "failed to Create Ticket";
  }
};

export const getTicketsService = async (agent_id: number | string) => {
  try {
    const response = await axios.post(
      API_URL_V1 + APIConstants.getTicket,
      {
        // conv_session_id,
        agent_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const updateTicketservice = async (updatedData: any) => {
  try {
    const response = await axios.put(
      API_URL_V1 + APIConstants.ticket,
      {
        ticket_id: "1",
        category: "Credit Card",
        sub_category: "Regalia",
        product: "CC",
        sub_product: "CC",
        priority: "High",
        subject: "CC",
        status: "CC",
        description: "CC",
        alt_ctct_number: "8248361911",
        alt_email: "Sam@trustt.com",
        tat: "48 hours",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const deleteTicketService = async (ticket_id: []) => {
  try {
    const response = await axios.delete(
      `${API_URL_V1 + APIConstants.ticket}/${ticket_id}`
    );

    const responseData = response;

    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};
