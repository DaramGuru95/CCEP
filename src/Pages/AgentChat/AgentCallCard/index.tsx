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
import MuteIcon from "../../../assets/icons/mute-button.svg";
import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";

interface AgentCallProps {
  handleClickOpen: any;
  AddCongerenceModal: any;
  handleChange: any;
  status: string;
  userData: any;
}

const AgentCallCard: React.FC<AgentCallProps> = ({
  handleClickOpen,
  AddCongerenceModal,
  handleChange,
  status,
  userData,
}) => {
  return (
    <div className="h-screen  bg-white rounded-md  justify-between flex flex-col  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <ChatNav
        source={OutgoingIcon}
        name="Ongoing Call"
        type={""}
        righticon={KababVerticalIcon}
        righticon2={MuteIcon}
      />
      <div className="px-2">
        <Box>
          <ContactCard
            handleClickOpen={handleClickOpen}
            item={AddCongerenceModal}
            name="sumit"
            imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
          />
        </Box>
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
      </div>
    </div>
  );
};

export default AgentCallCard;
