import { ThunkAction, combineReducers } from "@reduxjs/toolkit";
import appStateSlice from "./appState";
import { RootState } from "../..";
import imageSlice from "./profile_settings/uploadImage_reducer";
import userDetailsReducer from "./profile_settings/userDetails_reducer";
import createTicketsReducer from "./ticket_reducers/createTicket_reducer";
import updateTicketsReducer from "./ticket_reducers/updateTicket_reducer";
import getTicketDetailsReducer from "./ticket_reducers/getTicket_reducer";
import userImageReducer from "./profile_settings/fetchImage_reducer";
import alertSlice from "./alerts";
import getActiveSessionReducer from "./homepage_reducers/activesessions_reducer";
import getCurrentAvailabilityReducer from "./homepage_reducers/currentAvailability_reducer";
import getShiftDetailsReducer from "./homepage_reducers/shiftdetails_reducer";
import getTodayTicketReducer from "./homepage_reducers/todayTicekt_reducer";
import getCustomerFeedbackReducer from "./homepage_reducers/cutomerFeedback_reducer";
import getConversationStatReducer from "./homepage_reducers/conversationStat_reducer";
import getQandAReducer from "./QandA_reducers/QandA_reducer";
import getCustomer360Reducer from "./agentconsole_reducers/customer360_reducers";
import agentEndConversationReducer from "./agentconsole_reducers/agentEndConversation_reducers";
import getAgentCustFeedbackReducer from "./agentconsole_reducers/agentCustFeedback_reducers";
import getLogsReducer from "./logs_reducers/logs_reducers";
import getCustConvHistoryReducer from "./agentconsole_reducers/custConvHistory_reducers";
import getAgentTranscriptReducer from "./agentconsole_reducers/agentTranscript_reducers";
import transferChatReducer from "./agentconsole_reducers/transferChat_reducers";
import socketReducer from "./sockets_reducer/sockets_reducer";
import modalState from "./modal_reducers";
import currentTicketDetailsReducer from "./ticket_reducers/currentTicket_reducer";
import getFeedbackReducer from "./agentconsole_reducers/getFeedback_reducers";

export type AppDispatch = ThunkAction<void, RootState, null, any>;

export const rootReducers = combineReducers({
  appState: appStateSlice.reducer,
  alertState: alertSlice.reducer,
  modalState: modalState.reducer,
  uploadImageReducer: imageSlice.reducer,
  userDetails: userDetailsReducer.reducer,
  createTicket: createTicketsReducer.reducer,
  updateTickets: updateTicketsReducer.reducer,
  tickets: getTicketDetailsReducer.reducer,
  selectedTicketDetails: currentTicketDetailsReducer.reducer,
  imageDetails: userImageReducer.reducer,
  getActiveSession: getActiveSessionReducer.reducer,
  currentAvailability: getCurrentAvailabilityReducer.reducer,
  userImageReducer: userImageReducer.reducer,
  getShiftDetailsReducer: getShiftDetailsReducer.reducer,
  getTodayTicketReducer: getTodayTicketReducer.reducer,
  getCustomerFeedbackReducer: getCustomerFeedbackReducer.reducer,
  getConversationStatReducer: getConversationStatReducer.reducer,
  getQandAReducer: getQandAReducer.reducer,
  getCustomer360Reducer: getCustomer360Reducer.reducer,
  agentEndConversationReducer: agentEndConversationReducer.reducer,
  getAgentCustFeedbackReducer: getAgentCustFeedbackReducer.reducer,
  getLogsReducer: getLogsReducer.reducer,
  getCustConvHistoryReducer: getCustConvHistoryReducer.reducer,
  getAgentTranscriptReducer: getAgentTranscriptReducer.reducer,
  transferChatReducer: transferChatReducer.reducer,
  socketReducer: socketReducer.reducer,
  getFeedbackReducer: getFeedbackReducer.reducer,
});
