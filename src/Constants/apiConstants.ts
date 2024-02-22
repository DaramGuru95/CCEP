export const API_URL = "https://dev1-trusttgpt-ccep.trustt.com/trustt/api/";
//https://dev1-trusttgpt-converse.trustt.com
export const API_URL_V1 = API_URL + "v1/";
export const API_URL_V2 = API_URL + "v2/";
export const API_URL_V3 = API_URL + "v3/";
export const API_URL_V4 = API_URL + "v4/";

enum APIConstants {
  login = "login",
  getActiveSessions = "getActiveSessions",
  getFAQ = "getFAQ",
  uploadImage = "uploadImage",
  // userProfile = "getUserProfile",
  getUserDetials = "getUserProfile",
  getUserImage = "getUserImage",
  ticket = "ticket",
  agentResponse = "agentResponse",
  customer360 = "customer360",
  getTicket = "getTicket",
  getAvailabilityStatus = "getAvailabilityStatus",
  postAvailabilityStatus = "postAvailabilityStatus",
  getTranscriptSummary = "getTranscriptSummary",
  agentShiftDetails = "agentShiftDetails",
  todayTicketStatus = "todayTicketStatus",
  custFeedbackPercent = "custFeedbackPercent",
  getConversationStatistics = "getConversationStatistics",
  getFAQForAgent = "getFAQForAgent",
  endConversation = "endConversation",
  agentConvLogs = "agentConvLogs",
  getAgentConvStatsOnFeedback = "getAgentConvStatsOnFeedback",
  custConvHistory = "custConvHistory",
  getMasterData = "getMasterData",
  getTranscriptForConversation = "getTranscriptForConversation",
  logout = "logout",
  getConversationHistoryResponse = "getConversationHistoryResponse",
  transferChat = "transferChat",
  getActiveAgentsList = "getActiveAgentsList",
  agentFeedback = "agentFeedback",
  showCustomerSummaryForAgent = "showCustomerSummaryForAgent",
}

export default APIConstants;
