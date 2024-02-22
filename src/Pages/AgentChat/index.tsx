import React, { useEffect, useRef, useState } from "react";
import TrusttLogo from "../../assets/logo/trustt-logo.svg";
import CallIcon from "../../assets/icons/Call.svg";
import NoCoversation from "../../assets/icons/no-conversation.svg";

import TimerIcon from "../../assets/icons/timer.svg";
import CustomizedDialogs from "../../Common/DialogModal";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import EndConversation from "../../Common/DialogContent/EndConversation";
import { Box } from "@mui/system";
import axios from "axios";
import { socket } from "../../Config/socket";
import { useLocation, useNavigate } from "react-router-dom";
import AddConference from "../../Common/DialogContent/AddConference";
import AgentCallCard from "./AgentCallCard";
import AgentChatCard from "./AgentChatCard";
import ExpandableBoxes from "./ExpandableBoxes";
import Copilot from "./CoPilot";
import {
  convertToJSON,
  deleteLocalStorage,
  generateRandomColor,
  getCurrentTimeAsGMTString,
  getLocalStorage,
  setLocalStorage,
} from "../../Helpers/commonHelper";
import { useDispatch } from "react-redux";
import agentresponseAction from "../../Config/Store/Slices/actions/agentresponse_action/agentresponse_action";
import { AppDispatch, RootState } from "../../Config/Store";
import RightDrawer from "../../Common/Layout/Components/RightDrawer";
import AgentCompletedCard from "./AgentCompletedCard";
import AgentTranscript from "./AgentTranscript/AgentTranscript";
import { useSelector } from "react-redux";
import getActiveSessionAction from "../../Config/Store/Slices/actions/homepage_actions/activesessions_action";
import { SessionData } from "../../Config/Store/Slices/reducers/homepage_reducers/activesessions_reducer";
import { Avatar, Badge } from "@mui/material";
import customer360Action from "../../Config/Store/Slices/actions/agent_console_action/customer_360_action";
import { Customer360Modal } from "../../Config/Store/Slices/reducers/agentconsole_reducers/customer360_reducers";
import agentEndConversationAction from "../../Config/Store/Slices/actions/agent_console_action/agentEndConversation_action";
import customerFeedbackAction, {
  sendCustomerFeedbackAction,
} from "../../Config/Store/Slices/actions/agent_console_action/customerFeedack_action";
import getCustConvHistoryAction from "../../Config/Store/Slices/actions/homepage_actions/custConvHistory_action";
import { getTicketsAction } from "../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import agentTranscriptAction from "../../Config/Store/Slices/actions/agent_console_action/agentTranscript_action";
import { MessageProps } from "./modal";
import { agentEndConversationReset } from "../../Config/Store/Slices/reducers/agentconsole_reducers/agentEndConversation_reducers";
import Feedback from "../../Common/DialogContent/Feedback";
import { showAlert } from "../../Config/Store/Slices/reducers/alerts";
import getFeedbackAction from "../../Config/Store/Slices/actions/agent_console_action/getFeedback_action";

const AgentChatConsole = () => {
  const [inputmessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [copilotResponse, setCopilotResponse] = useState<MessageProps[]>([]);
  const [agentCustHistory, setAgentCustHistory] = useState<MessageProps[]>([]);

  const [conv_cust_session_id, setConvCustsessionid] = useState<string>("");
  const [llmResponseUsing, setllmResponseUsing] = useState<any>([]);
  const [dialogModal, setDailogModal] = useState<any>({});

  const [feedbackFormData, setFeedbackFormData] = React.useState([]);

  const [open, setOpen] = useState(false);
  const closeModalItem = {
    id: 1,
    text: "End Conversation",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: <EndConversation />,
    submitButtonText: "Submit",
    submitButtonFunction: (dispatch: any) =>
      dispatch(agentEndConversationAction(conv_session_id)),
  };

  const { isLoading, sendSuccess: feedbackStatus } = useSelector(
    (state: RootState) => state.getAgentCustFeedbackReducer
  );

  const handleFeedbackForm = () => {
    console.log("feedback clicked");
    setOpen(false);
    // if (feedbackStatus == "success") {
    deleteLocalStorage("selected_customer");
    deleteLocalStorage("conv_session_id");
    socket.emit("leave_chat_room", conv_session_id);
    navigate("/home");
    dispatch(
      showAlert({
        message: "Your feedback has been send",
        status: "success",
      })
    );
    // } else {
    //   deleteLocalStorage("selected_customer");
    //   deleteLocalStorage("conv_session_id");
    //   socket.emit("leave_chat_room", conv_session_id);
    //   navigate("/home");
    //   dispatch(
    //     showAlert({
    //       message: "Please try again",
    //       status: "error",
    //     })
    //   );
    // }
  };

  const FeedbackConversation = {
    id: 1,
    text: "Feedback",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: (
      <Feedback
        setFeedbackFormData={setFeedbackFormData}
        handleFeedbackForm={handleFeedbackForm}
      />
    ),
    submitButtonText: "Submit",
    submitButtonFunction: async (dispatch: any) => {
      // handleFeedbackForm();
      await dispatch(sendCustomerFeedbackAction(conv_session_id));
      handleFeedbackForm();
    },
  };
  const [dialogContent, setDialogContent] = useState<any>({ closeModalItem });
  const dispatch: AppDispatch = useDispatch();

  const AddCongerenceModal = {
    id: 1,
    text: "Add Conference",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: <AddConference />,
    submitButtonText: "Submit",
    submitButtonFunction: () => console.log("Clicked submit Conference"),
  };

  const handleClickOpen = (e: any, item: any) => {
    setDialogContent(item);
    setOpen(true);
    setDailogModal(item);
  };

  const handleClose = () => {
    // console.log("im in asiosdfi", dialogModal?.text);

    if (dialogModal?.text == "Feedback") {
      // console.log("im in feedback");
      deleteLocalStorage("selected_customer");
      deleteLocalStorage("conv_session_id");
      socket.emit("leave_chat_room", conv_session_id);
      navigate("/home");
      return;
    }

    setDialogContent([]);
    setOpen(false);
  };
  const length = 4;

  const { state } = useLocation();
  const getStoreType = getLocalStorage("agent_page");
  const getStoreStatus = getLocalStorage("agent_page_status");
  let selected_customer: any = getLocalStorage("selected_customer");
  let conversation_session_id: any = getLocalStorage("conv_session_id");
  const showTranscript = getLocalStorage("showTranscript");
  // console.log("showTranscript", showTranscript, state?.showTranscript);

  const [conv_session_id, setConvsessionid] = useState<any>("");
  const [selected_customer_id, setSelected_customer_id] = useState<any>("");
  const [filteredCustomerData, setFilteredCustomer] = useState<any>([]);
  const navigate = useNavigate();

  const [prevConvSessionId, setPrevConvSessionId] = useState<any>("");

  const [triggerEffect, setTriggerEffect] = useState(true); // State to trigger the effect

  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  const handleInput = (e: any) => setInputMessage(e.target.value);

  const agent_id = useSelector((state: RootState) => state.appState.emp_id);

  // const { data: ticketHistory } = useSelector(
  //   (state: RootState) => state.tickets
  // );

  // console.log(ticketHistory, "ticketHistoryticketHistory")

  const { isLoading: endConversLoader, status: endConverseStatus } =
    useSelector((state: RootState) => state.agentEndConversationReducer);

  const { data: customerData, isLoading: customer360Loader } = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );

  const { data: custConvHistory, isLoading: custHistoryLoader }: any =
    useSelector((state: RootState) => state.getCustConvHistoryReducer);
  const customer360: any = customerData;

  const { activeData: activeSessionListData, isLoading: activeListLoader } =
    useSelector((state: any) => state.getActiveSession);
  const activeSessionList: SessionData[] = activeSessionListData;

  const { data: allTranscript, isLoading: transcriptLoader }: any = useSelector(
    (state: RootState) => state.getAgentTranscriptReducer
  );
  const { status: socketStatus, data: transferResponseAgent } = useSelector(
    (state: RootState) => state.socketReducer
  );

  useEffect(() => {
    const function_code: string = "ACTIVE";
    setConvsessionid(
      `${state ? state.conv_session_id : conversation_session_id}`
    );

    dispatch(getActiveSessionAction(function_code));
  }, [dispatch, state, transferResponseAgent]);

  const handleChangeSelection = (val: any) => {
    setConvsessionid((prev: any) => {
      setPrevConvSessionId(prev);
      return val?.existing_session?.conv_session_id;
    });
    setLocalStorage("selected_customer", val?.existing_session?.customer_id);
    setLocalStorage("conv_session_id", val?.existing_session?.conv_session_id);
  };

  useEffect(() => {
    const firstData: any = activeSessionList[0]?.existing_session;
    if (!selected_customer && !conversation_session_id) {
      console.log("im in 210 !selected_customer && !conversation_session_id");
      console.log("asdsdfsdsdf", activeSessionList[0]?.existing_session);
      setFilteredCustomer(activeSessionList[0]);
      setConvsessionid(activeSessionList[0]?.existing_session?.conv_session_id);
      setLocalStorage(
        "selected_customer",
        activeSessionList[0]?.existing_session?.customer_id
      );
      setLocalStorage(
        "conv_session_id",
        activeSessionList[0]?.existing_session?.conv_session_id
      );
      selected_customer = activeSessionList[0]?.existing_session?.customer_id;
      conversation_session_id =
        activeSessionList[0]?.existing_session?.conv_session_id;
      setSelected_customer_id(selected_customer);
      setConvsessionid(conversation_session_id);
    } else if (
      firstData?.customer_id != selected_customer ||
      firstData?.conv_session_id != conversation_session_id
    ) {
      console.log(
        conversation_session_id,
        selected_customer,
        firstData?.customer_id,
        firstData?.conv_session_id,
        state?.showTranscript,
        "firstData?.customer_id != selected_customer && firstData?.conv_session_id != conversation_session_id"
      );
      if (state?.showTranscript == `showTranscript`) {
        setSelected_customer_id(state?.customer_id);
        setConvsessionid(state?.conv_session_id);

        return;
      }
      selected_customer = firstData?.customer_id;
      conversation_session_id = firstData?.conv_session_id;
      setLocalStorage("selected_customer", firstData?.customer_id);
      setLocalStorage("conv_session_id", firstData?.conv_session_id);

      setSelected_customer_id(firstData?.customer_id);
      setConvsessionid(firstData?.conv_session_id);

      // if (conv_session_id) {
      console.log("im there in conversation");
      // }
      console.log(
        conversation_session_id,
        selected_customer,
        firstData?.customer_id,
        firstData?.conv_session_id,
        "firstData?.customer_id != selected_customer && firstData?.conv_session_id != conversation_session_id"
      );
      setFilteredCustomer(
        activeSessionList.filter(
          (session) =>
            session.existing_session.customer_id === Number(selected_customer)
        )
      );
    } else {
      console.log(
        "im there 1111111 else",
        firstData?.customer_id,
        selected_customer,
        firstData?.conv_session_id,
        conversation_session_id
      );
      selected_customer = firstData?.customer_id;
      conversation_session_id = firstData?.conv_session_id;
      setLocalStorage("selected_customer", firstData?.customer_id);
      setLocalStorage("conv_session_id", firstData?.conv_session_id);
      if (activeSessionListData?.length && state?.showTranscript) {
        setConvsessionid(firstData?.conv_session_id);
      }

      setFilteredCustomer(
        activeSessionList.filter(
          (session) =>
            session.existing_session.customer_id === Number(selected_customer)
        )
      );
    }
  }, [transferResponseAgent, activeSessionListData]);

  // useEffect(() => {
  //   console.log("filteredCustomerData", filteredCustomerData);
  // }, [filteredCustomerData]);

  // }, [conversation_session_id, dispatch, state]);

  useEffect(() => {
    // socket.emit("join_chat_room", `${conv_session_id}`);

    function onConnect() {
      console.log("connect");
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    setInterval(() => {
      // console.log("im in intervel");
      socket.emit("heartbeat", new Date());
    }, 10000);
    socket.on("heartbeat_ack", ({ status }: any) => {
      // console.log("heartbeat is coming: ", status);
      if (status == "alive") {
      } else {
        socket.emit("heartbeat", new Date());
        socket.emit("join_chat_room", conv_session_id);
      }
    });

    socket.on("assistant_response", (data) => {
      console.log("im there in assistant_response", data);
      // const time = new Date();
      // .toLocaleTimeString("en-US", {
      //   hour: "numeric",
      //   minute: "numeric",
      //   hour12: true,
      // });
      const newCopilotMessage: MessageProps = {
        sending: "",
        recieving: "",
        llmResponse: data["assistant_response"],
        conv_session_id: data["conv_session_id"],
        agent_id: data["agent_id"],
        action_flag: data["action_flag"],
        conv_co_piolot_session_id: data["conv_co_piolot_session_id"],
        conv_cust_session_id: data["conv_cust_session_id"],
        lang_code: data["lang_code"],
        lead_status: data["lead_status"],
        mask_otp: data["mask_otp"],
        time: getCurrentTimeAsGMTString(),
        // data["current_time_stamp"] ? data["current_time_stamp"] : time,
      };
      setConvCustsessionid(data["conv_cust_session_id"]);
      setCopilotResponse((prev) => [...prev, newCopilotMessage]);
    });
    socket.on("make_connection", (data) => {
      // console.log("connection established", data);
    });
    // socket.on("agent_response", (data: any) => {
    //   // console.log("data agent_response", data["agent_response"]);
    // });

    socket.on("user_query", (data) => {
      // console.log("im there in user_query", data);
      // const time = new Date().toLocaleTimeString("en-US");
      // .toLocaleTimeString("en-US", {
      //   hour: "numeric",
      //   minute: "numeric",
      //   hour12: true,
      // });

      // setConvsessionid(data["conv_session_id"]);
      const newMessage: MessageProps = {
        sending: "",
        recieving: data,
        llmResponse: "",
        conv_session_id: "",
        agent_id: "",
        action_flag: "",
        conv_co_piolot_session_id: "",
        conv_cust_session_id: "",
        lang_code: "",
        lead_status: "",
        mask_otp: "",
        time: getCurrentTimeAsGMTString(),
      };
      const newCopilotMessage: MessageProps = {
        sending: "",
        recieving: data,
        llmResponse: "",
        conv_session_id: data["conv_session_id"],
        agent_id: data["agent_id"],
        action_flag: "",
        conv_co_piolot_session_id: "",
        conv_cust_session_id: "",
        lang_code: "",
        lead_status: "",
        mask_otp: "",
        time: getCurrentTimeAsGMTString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setCopilotResponse((prev) => [...prev, newCopilotMessage]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("assistant_response", () => {});
      socket.off("user_query", () => {});
    };
  }, []);

  useEffect(() => {
    // console.log(conv_session_id, "sa");
    // if (conv_session_id) {
    setTriggerEffect(false); // Activate the effect
    const timeout = setTimeout(() => {
      setTriggerEffect(true); // Deactivate the effect after the transition duration
    }, 300); // Transition duration in milliseconds (adjust as needed)

    let function_code = "BOTH";
    console.log("conv_session_id", conv_session_id);

    if (conv_session_id) {
      dispatch(customer360Action(conv_session_id));
      dispatch(getCustConvHistoryAction(conv_session_id));
      dispatch(getTicketsAction(conv_session_id));
      dispatch(customerFeedbackAction(conv_session_id));
      dispatch(getFeedbackAction(conv_session_id));

      if (prevConvSessionId) socket.emit("leave_chat_room", prevConvSessionId);
      socket.emit("join_chat_room", conv_session_id);
      // if (getStoreStatus == `"CLOSED"` || getStoreStatus == `"TRANSFERRED"`) {
      //   console.log("this is closed");
      //   function_code = "CUST_TO_AGENT";

      dispatch(agentTranscriptAction({ conv_session_id, function_code }));
      // } else {
      //   dispatch(agentTranscriptAction({ conv_session_id, function_code }));
      // }
    }
    if (selected_customer) {
      const selected_customer = getLocalStorage("selected_customer");
      setSelected_customer_id(selected_customer);
    }

    return () => clearTimeout(timeout);

    // }
  }, [
    conv_session_id,
    activeListLoader,
    activeSessionListData,
    transferResponseAgent,
    selected_customer_id,
  ]);

  useEffect(() => {
    // if (getStoreStatus == `"CLOSED"`)
    if (!transcriptLoader) {
      if (allTranscript) {
        const {
          conv_bt_agent_copiolot,
          conv_bt_agent_cust,
          conv_closed_time,
        }: {
          conv_bt_agent_copiolot: any;
          conv_bt_agent_cust: any;
          conv_closed_time: string | null;
        } = allTranscript;
        const copilotConvertJson = conv_bt_agent_copiolot?.map((item: any) => {
          return {
            ...item,
            actual_response: convertToJSON(item.actual_response),
          };
        });
        const agentCustConvertJson = conv_bt_agent_cust?.map((item: any) => {
          return {
            ...item,
            actual_response: convertToJSON(item.actual_response),
          };
        });

        console.log(" agentCustConvertJson", agentCustConvertJson);

        const copilotResponseData: MessageProps[] = copilotConvertJson?.map(
          (item: any) => {
            return {
              co_piolot_session_id: item.co_piolot_session_id,
              sending: "",
              recieving: item.query,
              llmResponse: item["actual_response"]
                ? item["actual_response"]["assistant_response"]
                : "",
              conv_session_id: item["actual_response"]
                ? item["actual_response"]["conv_session_id"]
                : "",
              agent_id: "",
              action_flag: item["actual_response"]
                ? item["actual_response"]["action_flag"]
                : "",
              conv_co_piolot_session_id: "",
              conv_cust_session_id: item["actual_response"]
                ? item["actual_response"]["conv_cust_session_id"]
                : "",
              lang_code: item["actual_response"]
                ? item["actual_response"]["lang_code"]
                : "",
              lead_status: item["actual_response"]
                ? item["actual_response"]["lead_status"]
                : "",
              mask_otp: item["actual_response"]
                ? item["actual_response"]["mask_otp"]
                : "",
              time: item["start_time"] ? item["start_time"] : "NA",
            };
          }
        );
        const agentCustResponseData: MessageProps[] = agentCustConvertJson?.map(
          (item: any) => ({
            co_piolot_session_id: item.co_piolot_session_id,
            sending:
              item["actual_response"] &&
              item["actual_response"]["agent_response"],
            recieving: item.query,
            llmResponse: "",
            conv_session_id: item["actual_response"]
              ? item["actual_response"]["conv_session_id"]
              : "",
            agent_id: "",
            action_flag: item["actual_response"]
              ? item["actual_response"]["action_flag"]
              : "",
            conv_co_piolot_session_id: item["actual_response"]
              ? item["actual_response"]["conv_co_piolot_session_id"]
              : "",
            conv_cust_session_id: item["actual_response"]
              ? item["actual_response"]["conv_cust_session_id"]
              : "",
            lang_code: item["actual_response"]
              ? item["actual_response"]["lang_code"]
              : "",
            lead_status: item["actual_response"]
              ? item["actual_response"]["lead_status"]
              : "",
            mask_otp: item["actual_response"]
              ? item["actual_response"]["mask_otp"]
              : "",
            time: item["start_time"] ? item["start_time"] : "NA",
          })
        );

        setMessages(agentCustResponseData);

        setCopilotResponse(copilotResponseData);
        setAgentCustHistory(agentCustResponseData);
      }
    }
  }, [transcriptLoader]);

  // useEffect(() => {
  //   console.log(": Conversation closed  ", conv_session_id);
  //   if (getStoreStatus == `"CLOSED"` || getStoreStatus == `"TRANSFERRED"`) {
  //     const conv_bt_agent_cust: any = allTranscript?.conv_bt_agent_cust;

  //     const agentCustConvertJson = conv_bt_agent_cust?.map((item: any) => {
  //       return {
  //         ...item,
  //         actual_response: convertToJSON(item.actual_response),
  //       };
  //     });
  //     // console.log("parsedata agentCustConvertJson", agentCustConvertJson);
  //     // const copilotConvertJson = parseActualResponse(conv_bt_agent_copiolot);

  //     // const agentCustConvertJson = parseActualResponse(conv_bt_agent_cust);

  //     // const copilotResponseData: MessageProps[] = copilotConvertJson?.map(
  //     //   (item: any) => {
  //     //     return {
  //     //       co_piolot_session_id: item.co_piolot_session_id,
  //     //       sending: "",
  //     //       recieving: item.query,
  //     //       llmResponse: item["actual_response"]
  //     //         ? item["actual_response"]["assistant_response"]
  //     //         : "",
  //     //       conv_session_id: item["actual_response"]
  //     //         ? item["actual_response"]["conv_session_id"]
  //     //         : "",
  //     //       agent_id: "",
  //     //       action_flag: item["actual_response"]
  //     //         ? item["actual_response"]["action_flag"]
  //     //         : "",
  //     //       conv_co_piolot_session_id: "",
  //     //       conv_cust_session_id: item["actual_response"]
  //     //         ? item["actual_response"]["conv_cust_session_id"]
  //     //         : "",
  //     //       lang_code: item["actual_response"]
  //     //         ? item["actual_response"]["lang_code"]
  //     //         : "",
  //     //       lead_status: item["actual_response"]
  //     //         ? item["actual_response"]["lead_status"]
  //     //         : "",
  //     //       mask_otp: item["actual_response"]
  //     //         ? item["actual_response"]["mask_otp"]
  //     //         : "",
  //     //     };
  //     //   }
  //     // );
  //     const agentCustResponseData: MessageProps[] = agentCustConvertJson?.map(
  //       (item: any) => ({
  //         co_piolot_session_id: item.co_piolot_session_id,
  //         sending:
  //           item["actual_response"] &&
  //           item["actual_response"]["agent_response"],
  //         recieving: item.query,
  //         llmResponse: "",
  //         conv_session_id: item["actual_response"]
  //           ? item["actual_response"]["conv_session_id"]
  //           : "",
  //         agent_id: "",
  //         action_flag: item["actual_response"]
  //           ? item["actual_response"]["action_flag"]
  //           : "",
  //         conv_co_piolot_session_id: item["actual_response"]
  //           ? item["actual_response"]["conv_co_piolot_session_id"]
  //           : "",
  //         conv_cust_session_id: item["actual_response"]
  //           ? item["actual_response"]["conv_cust_session_id"]
  //           : "",
  //         lang_code: item["actual_response"]
  //           ? item["actual_response"]["lang_code"]
  //           : "",
  //         lead_status: item["actual_response"]
  //           ? item["actual_response"]["lead_status"]
  //           : "",
  //         mask_otp: item["actual_response"]
  //           ? item["actual_response"]["mask_otp"]
  //           : "",
  //       })
  //     );
  //     console.log(" agentCustConvertJson json json", agentCustResponseData);

  //     setAgentCustHistory(agentCustResponseData);
  //   }

  //   // console.log("conv_bt_agent_copiolot", conv_bt_agent_copiolot);
  //   // setCopilotResponse(copilotResponseData);}
  // }, [conv_session_id]);

  useEffect(() => {
    if (!endConversLoader && endConverseStatus == "failed") {
      dispatch(agentEndConversationReset());
    }
    if (!endConversLoader && endConverseStatus == "success") {
      setDailogModal(FeedbackConversation);
      // dispatch(agentEndConversationReset());
    }
  }, [endConversLoader]);

  const handleResponse = async (data: any) => {
    const headers = {};
    console.log("conver-id: ", conv_session_id, "data", data);
    const time = new Date();
    // .toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // });
    const body = {
      agent_response: inputmessage,
      conv_session_id: conv_session_id,
      conv_cust_session_id,
      lang_code: data?.lang_code ? data?.lang_code : "en-IN",
    };

    const newRes = await dispatch(agentresponseAction(body));
    // console.log("newRes", newRes);

    const newMessage: MessageProps = {
      sending: inputmessage,
      recieving: "",
      llmResponse: data["assistant_response"],
      conv_session_id: data["conv_session_id"],
      agent_id: data["agent_id"],
      action_flag: data["action_flag"],
      conv_co_piolot_session_id: data["conv_co_piolot_session_id"],
      conv_cust_session_id: data["conv_cust_session_id"],
      lang_code: data["lang_code"],
      lead_status: data["lead_status"],
      mask_otp: data["mask_otp"],
      time: getCurrentTimeAsGMTString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setllmResponseUsing([]);
    setInputMessage("");
  };

  const sendMessage = (type?: string) => {
    // if (type == "use_llm") {
    handleResponse(llmResponseUsing);
    // }
  };

  const [emptyBox, setEmptyBox] = useState(false);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // console.log(
  //   "selected_customer_id conv_session_id",
  //   selected_customer_id,
  //   conv_session_id
  // );

  useEffect(() => {
    scrollToBottom();

    if (activeSessionList?.length == 0 && !state?.showTranscript) {
      setEmptyBox(true);
    }
  }, [activeListLoader, activeSessionListData]);

  if (!activeSessionListData?.length && !state?.showTranscript) {
    return (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        width={"100%"}
      >
        <Box
          width={"88%"}
          height={"100vh"}
          sx={{ background: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <div>
            <img src={NoCoversation} alt="" className="inline-block" />
            <p className="text-gray-400">
              You don’thave any ongoing conversation
            </p>
          </div>
        </Box>
        <RightDrawer
          activeSessionList={activeSessionList}
          conv_session_id={conv_session_id}
        />
      </Box>
    );
  }

  const handleSubmitButtonEnd = async () => {
    await dispatch(agentEndConversationAction(conv_session_id));
    // deleteLocalStorage("selected_customer");
    // deleteLocalStorage("conv_session_id");
    // socket.emit("leave_chat_room", conv_session_id);
    // navigate("/home");
  };

  const transferResponseToInput = (data: any) => {
    setInputMessage(`${data["llmResponse"]}`);
    setllmResponseUsing(data);
  };

  const handleSendFeedback = async () => {
    console.log("conv_cust_session_id", conv_session_id);
  };

  if (activeListLoader || transcriptLoader) {
    // console.log("im in loading state");
    return (
      <Box display={"flex"} width={"100%"}>
        {" "}
        Loading.....
      </Box>
    );
  }
  return (
    <Box display={"flex"} width={"100%"}>
      <Box flexBasis={"95%"}>
        <CustomizedDialogs
          open={open}
          handleClose={handleClose}
          dialogContent={dialogModal}
          isAttachment={false}
          attachmentClickFunction
        />
        {
          // (state?.type === "CHAT" || getStoreType === `"CHAT"`) &&
          //   !state?.showTranscript && (
          // !activeListLoader &&
          activeSessionList?.length && !state?.showTranscript ? (
            // getStoreStatus === `"ACTIVE"` && (
            <div className="bg-white px-2 rounded-md">
              <p className="text-sm font-semibold py-2">Ongoing Conversation</p>
              <div className="px-0 py-0   grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {activeSessionList?.map((val, index) => (
                  <li
                    key={index}
                    className={
                      "py-3 justify-between bg-white sm:py-2 border-1 border-black  hover:ring-sky-400 mb-3 ring-1 px-2 rounded-md flex  flex-grow max-w-fit  " +
                      `${
                        selected_customer_id == val.existing_session.customer_id
                          ? "ring-sky-400"
                          : "ring-custom-color"
                      }`
                    }
                    onClick={() => {
                      handleChangeSelection(val);
                      // setConvsessionid((prev: any) => {
                      //   setPrevConvSessionId(prev);
                      //   console.log(
                      //     prev,
                      //     "val?.existing_session?.conv_session_id",
                      //     val?.existing_session?.conv_session_id
                      //   );
                      //   return val?.existing_session?.conv_session_id;
                      // });
                      // setLocalStorage(
                      //   "selected_customer",
                      //   val?.existing_session?.customer_id
                      // );
                      // setLocalStorage(
                      //   "conv_session_id",
                      //   val?.existing_session?.conv_session_id
                      // );
                    }}
                  >
                    {index !== 0 && (
                      <Badge
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        sx={{
                          color: " #00769B",
                          ".MuiBadge-badge": {
                            background: "#F0F9FF",
                            fontSize: 8,
                            left: 40,
                            top: "-10px",
                            fontWeight: 600,
                            width: "max-content",
                          },
                        }}
                        badgeContent={"23 new messages"}
                      ></Badge>
                    )}

                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Avatar
                          alt=""
                          className=" rounded-full"
                          sx={{
                            height: 32,
                            width: 32,
                            bgcolor: index % 2 === 0 ? "#74dbd5" : "#ffcc80",
                          }}
                        >
                          {val.customer_details.first_name[0]}
                        </Avatar>
                      </div>
                      <div className="flex-1 ms-2">
                        <p className="fs-14 font-bold text-gray-900 truncate dark:text-white">
                          {val.customer_details.first_name +
                            " " +
                            val.customer_details.last_name.substring(0, 6) +
                            "..."}
                        </p>
                        <p className="fs-10 font-semibold text-slate-600 truncate dark:text-gray-400">
                          <span>#89348</span>
                          <span className="font-normal ">
                            ({val?.existing_session?.channel})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      <div className="flex-1 ms-2">
                        <p className=" fs-8 text-gray-400 bg-sky-50 p-1  rounded-full truncate dark:text-gray-400">
                          <img
                            className="inline-block w-3 h-3 rounded-full mr-1 "
                            src={TimerIcon}
                            alt="Call"
                          />
                          <span className="text-sky-600 font-semibold">
                            {val.existing_session.session_duration}
                          </span>
                        </p>
                        <p className=" fs-10 mt-1 text-center bg-green-100 text-green-700 rounded-full font-semibold ">
                          Active
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          ) : (
            ""
          )
        }

        <div
          ref={messagesEndRef}
          className={`px-0 py-0 mt-2 transactionEffect ${
            triggerEffect ? "active" : ""
          }  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-[8px]`}
        >
          {/* {(state?.type === "CHAT" || getStoreType === `"CHAT"`) &&
            getStoreStatus === `"ACTIVE"` && (
              <AgentChatCard
                handleClickOpen={handleClickOpen}
                closeModalItem={closeModalItem}
                messages={messages}
                sendMessage={sendMessage}
                handleInput={handleInput}
                userData={filteredCustomerData}
                inputmessage={inputmessage}
              />
            )} */}
          {!state?.showTranscript && (
            <AgentChatCard
              handleClickOpen={handleClickOpen}
              closeModalItem={closeModalItem}
              messages={messages}
              sendMessage={sendMessage}
              handleInput={handleInput}
              userData={filteredCustomerData}
              inputmessage={inputmessage}
              copilotResponse={copilotResponse}
            />
          )}
          {/* !state?.showTranscript */}
          {/* {(state?.type === "calling" || getStoreType === `"calling"`) &&
            getStoreStatus === `"ACTIVE"` && (
              <AgentCallCard
                AddCongerenceModal={AddCongerenceModal}
                handleClickOpen={handleClickOpen}
                handleChange={handleChange}
                status={status}
                userData={filteredCustomerData}
              />
            )} */}
          {/* {(state?.type === "calling" || getStoreType === `"calling"`) &&
            !state?.showTranscript && (
              <AgentCallCard
                AddCongerenceModal={AddCongerenceModal}
                handleClickOpen={handleClickOpen}
                handleChange={handleChange}
                status={status}
                userData={filteredCustomerData}
              />
            )} */}
          {/* {(state?.type === "CHAT" || getStoreType === `"CHAT"`) &&
            (getStoreStatus === `"CLOSED"` ||
              getStoreStatus === `"TRANSFERRED"`) && (
              <AgentCompletedCard
                AddCongerenceModal={AddCongerenceModal}
                handleClickOpen={handleClickOpen}
                handleChange={handleChange}
                status={status}
              />
            )} */}
          {(state?.type === "CHAT" || getStoreType === `"CHAT"`) &&
            state?.showTranscript && (
              <AgentCompletedCard
                AddCongerenceModal={AddCongerenceModal}
                handleClickOpen={handleClickOpen}
                handleChange={handleChange}
                status={status}
              />
            )}
          {/* {(state?.type == "CHAT" || getStoreType == `"CHAT"`) &&
            (getStoreStatus == `"CLOSED"` ||
              getStoreStatus == `"TRANSFERRED"`) && (
              <AgentTranscript messages={agentCustHistory} />
            )} */}
          {(state?.type == "CHAT" || getStoreType == `"CHAT"`) &&
            state?.showTranscript && (
              <AgentTranscript messages={agentCustHistory} />
            )}
          {/* {(state?.type != "Completed" || getStoreType != "Completed") &&
            getStoreStatus == `"ACTIVE"` && (
              <Copilot
                copilotResponse={copilotResponse}
                handleResponse={transferResponseToInput}
                // transferResponseToInput={transferResponseToInput}
              />
            )} */}
          {(state?.type != "Completed" || getStoreType != "Completed") &&
            !state?.showTranscript && (
              <Copilot
                copilotResponse={copilotResponse}
                handleResponse={transferResponseToInput}
                // transferResponseToInput={transferResponseToInput}
              />
            )}
          <ExpandableBoxes
            custConvHistory={custConvHistory}
            customer360={customer360}
            // ticketHistory={ticketHistory}
            // ticketHistory={
            //   ticketHistory && ticketHistory.data ? ticketHistory.data : []
            // }
          />
        </div>
      </Box>
      <RightDrawer
        selected_customer={selected_customer}
        conv_session_id={conv_session_id}
        activeSessionList={activeSessionList}
        rightDrawerClick={
          activeSessionListData?.length
          // !activeSessionListData?.length && !state?.showTranscript
        }
      />
      {/* <div ref={messagesEndRef}></div> */}
    </Box>
  );
};

export default AgentChatConsole;
