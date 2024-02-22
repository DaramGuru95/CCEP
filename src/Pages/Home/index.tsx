import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Switch from "@mui/material/Switch";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import { Paragraph } from "../../Components/ui/paragraph/paragraph";
import Table from "../../Components/table/Table";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../Helpers/commonHelper";
import { useDispatch } from "react-redux";

import { getActiveSessionAction } from "../../Config/Store/Slices/actions/homepage_actions/activesessions_action";
import { AppDispatch, RootState } from "../../Config/Store";
import { useSelector } from "react-redux";

// import TrusttLogo from "../../assets/logo/trustt-logo.svg";

import {
  // postcurrentAvailabilityAction,
  getcurrentAvailabilityAction,
} from "../../Config/Store/Slices/actions/homepage_actions/currentAvailability_action";
import getEmpShiftDetailsAction from "../../Config/Store/Slices/actions/homepage_actions/shiftdetails_action";
import getTodayTicketAction from "../../Config/Store/Slices/actions/homepage_actions/todayTicket_action";
import getCustomerFeedbackAction from "../../Config/Store/Slices/actions/homepage_actions/customerFeedback_action";
import getConversationStatAction from "../../Config/Store/Slices/actions/homepage_actions/conversationStat_action";
import CustomerFeedback from "./Cards/CustomerFeedback";
import ShiftDetails from "./Cards/ShiftDetails";
import ConversationStats from "./Cards/ConversationStats";
import TodaysTicketStatus from "./Cards/TodaysTicketStatus";
import { resetSocketData } from "../../Config/Store/Slices/reducers/sockets_reducer/sockets_reducer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { status: socketStatus, data: transferResponseAgent } = useSelector(
    (state: RootState) => state.socketReducer
  );

  const { data } = useSelector((state: any) => state.getActiveSession);

  const handleClickRow = (
    type: string,
    status: string,
    customer_id: string,
    conv_session_id: string,
    showTranscript?: string | null
  ) => {
    setLocalStorage("agent_page", type);
    setLocalStorage("agent_page_status", status);
    setLocalStorage("selected_customer", customer_id);
    setLocalStorage("conv_session_id", conv_session_id);
    setLocalStorage("showTranscript", showTranscript);
    navigate("/agent-console", {
      state: { type, status, customer_id, conv_session_id, showTranscript },
    });
  };

  const tabs = [
    { name: "All Customers", url_type: "customers", bedge: data.length },
    { name: "Supervised", url_type: "supervised", bedge: "0" },
  ];
  useEffect(() => {
    const function_code: string = "ALL";

    dispatch(getActiveSessionAction(function_code));
    dispatch(getcurrentAvailabilityAction());
    dispatch(getEmpShiftDetailsAction());
    dispatch(getTodayTicketAction());
    dispatch(getCustomerFeedbackAction());
    dispatch(getConversationStatAction());
    dispatch(resetSocketData);
  }, [dispatch, transferResponseAgent]);

  return (
    <Box width={"100%"} marginTop={1}>
      <Box>
        <Grid container display={"row"} justifyContent={"space-between"}>
          <ShiftDetails />
          <ConversationStats />
          <TodaysTicketStatus />
          <CustomerFeedback />
        </Grid>
      </Box>
      <Box>
        <Table tabs={tabs} tableData={data} handleClickRow={handleClickRow} />
      </Box>
    </Box>
  );
};

export default Home;
