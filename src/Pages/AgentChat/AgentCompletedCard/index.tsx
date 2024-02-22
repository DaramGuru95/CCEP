import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChatNav } from "../../../Components/ui/ui/chat-header/ChatNav";
import ContactCard from "../../../Common/ContactCard";
import OutgoingIcon from "../../../assets/icons/outgoing.svg";
import MessageLight from "../../../assets/icons/Message2.svg";
import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";
import { useLocation } from "react-router-dom";
import {
  calculateTotalTime,
  getLocalStorage,
} from "../../../Helpers/commonHelper";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";
import { AgentTranscriptModal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/agentTranscript_reducers";
import { FeedbackModal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/getFeedback_reducers";

interface AgentCompletedProps {
  handleClickOpen: any;
  AddCongerenceModal: any;
  handleChange: any;
  status: string;
}

const AgentCompletedCard: React.FC<AgentCompletedProps> = ({
  handleClickOpen,
  AddCongerenceModal,
  handleChange,
  status,
}) => {
  const { state } = useLocation();
  const getStoreType = getLocalStorage("agent_page");
  const getStoreStatus = getLocalStorage("agent_page_status");
  const customerData = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );

  const { data: feedbackData }: { data: FeedbackModal } = useSelector(
    (state: RootState) => state.getFeedbackReducer
  );
  const customer360: any = customerData.data;
  const { data: transcriptInfo }: { data: AgentTranscriptModal | null } =
    useSelector((state: RootState) => state.getAgentTranscriptReducer);
  return (
    <div className="h-screen  bg-white rounded-md   flex flex-col  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <ChatNav
        source={
          state?.type == "CHAT" || getStoreType == `"CHAT"`
            ? MessageLight
            : OutgoingIcon
        }
        name={
          state?.type == "CHAT" || getStoreType == `"CHAT"`
            ? "Conversation Details"
            : "Call Details"
        }
        type={""}
        righticon={KababVerticalIcon}
        // righticon2={MuteIcon}
      />
      <div className="px-2">
        <Box>
          <ContactCard
            handleClickOpen={handleClickOpen}
            item={AddCongerenceModal}
            name={" " + customer360?.first_name + " " + customer360?.last_name}
            imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
            totalTime={calculateTotalTime(
              transcriptInfo?.conv_initiated_time,
              transcriptInfo?.conv_closed_time
            )}
          />
        </Box>
        {(state?.type == "CHAT" || getStoreType == `"CHAT"`) &&
        (getStoreStatus == `"CLOSED"` || getStoreStatus == `"TRANSFERRED"`) ? (
          <Box sx={{ background: "#f5f6fb", padding: 1 }}>
            <Typography
              variant="subtitle1"
              className="text-xs"
              sx={{ fontWeight: "bold", fontSize: 12 }}
            >
              {state?.type == "CALL" || getStoreType == `"CALL"`
                ? "Call "
                : "Conversation "}
              Details
            </Typography>
            <div className="my-2">
              <p className="text-gray-600 text-xs">Reason</p>
              <p className="text-color-heading text-xs">
                {feedbackData?.conv_reason}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Description</p>
              <p className="text-color-heading text-xs">
                {feedbackData?.summary}
              </p>
            </div>
            <div className="my-2">
              <p className="text-gray-600 text-xs">Status</p>
              <p className="text-color-heading text-xs">
                {feedbackData?.STATUS}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Resolution</p>
              <p className="text-color-heading text-xs">
                {feedbackData?.resolution_status}
                {}{" "}
              </p>
            </div>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Log Call Details
            </Typography>
            <FormControl fullWidth sx={{ p: 1 }} size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Subject
              </label>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value={""}>Had a query</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ p: 1 }} size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Category
              </label>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value={""}>Had a query</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Description
              </label>
              <TextField
                placeholder="Please describe the issue"
                multiline
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth sx={{ p: 1 }} size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Status
              </label>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value={""}>Select</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ p: 1 }} size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Resolution
              </label>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value={""}>Select</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth size="small">
              <label htmlFor="" className="text-xs text-gray-500">
                Remarks
              </label>
              <TextField placeholder="Enter text" fullWidth />
            </FormControl>
          </Box>
        )}
      </div>
    </div>
  );
};

export default AgentCompletedCard;
