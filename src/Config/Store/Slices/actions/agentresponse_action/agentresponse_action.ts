import { createAsyncThunk } from "@reduxjs/toolkit";
import agentResponseService from "../../services/agentresponse_services/agentresponse_services";

const agentresponseAction = createAsyncThunk(
  "agentresponse/usellm",
  async (body: any | null) => {
    console.log(body, "THUNK");

    const response: any = await agentResponseService(body);
    return response;
  }
);

export default agentresponseAction;
