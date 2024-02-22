import { Avatar, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link } from "react-router-dom";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
// import moment from "moment";
import CellFooter from "./CellFooter";
import { AppDispatch } from "../../../../../Config/Store";
import { useDispatch } from "react-redux";
import { getCurrentTicketDetailsAction } from "../../../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";

interface TicketDetailsCellProps {
  data: {
    id: string;
    created_on: string;
    customer_id: number;
    customer_name: string;
    description: string;
    due_within: string;
    priority: string;
    product: string;
    status: string;
    sub_category: string;
    sub_product: string;
    subject: string;
    category: string;
    label: string;
    ticket_id: string;
    tat: string;
  };
}

const TicketDetailsCell: React.FC<TicketDetailsCellProps> = ({
  data,
}: TicketDetailsCellProps) => {
   
  const dispatch:AppDispatch =  useDispatch();





  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1.8}
      component={Link}
      to={`/tickets/${data.ticket_id}`}
      onClick={()=>dispatch(getCurrentTicketDetailsAction(data))}
    >
      <Box>
        <Avatar
          sizes="small"
          sx={{
            bgcolor: "#B3E0EE",
            color: "#54B2D0",
            borderRadius: 1,
            width: 46,
            height: 46,
            fontWeight: "medium",
          }}
          variant="square"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {data.customer_name.charAt(0)}
          </Typography>
        </Avatar>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        // alignItems={"center"}
        gap={0.8}
      >
        <Box sx={{ display: "flex", gap: 0.8 }}>
          <Chip
            variant="outlined"
            color="success"
            size="small"
            label={"New"}
            sx={{
              bgcolor: "#EBF9EF",
              fontSize: 10,
              height: "2em",
              width: "2.8rem",
              border: "none",
              fontWeight: 600,
            }}
          />
          <Chip
            variant="outlined"
            size="small"
            icon={<AccountTreeOutlinedIcon sx={{ width: 8, height: 8 }} />}
            label={"Parent"}
            sx={{
              fontSize: 8,
              height: 18,
              fontWeight: 600,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: 800, fontSize: "14px", color: "#001E27CC" }}
        >
          {`${data.subject} `}|{` ${data.category} `}|
          <span style={{ color: "#54B2D0" }}>
            {` #${data.ticket_id}`}
            {/* <Link to={`/tickets/${data.ticketNo}`}></Link>{" "} */}
          </span>
        </Typography>
        <CellFooter
          createdOn={data.created_on}
          customerName={data.customer_name}
          tat={data.tat}
        />
      </Box>
    </Box>
  );
};

export default TicketDetailsCell;
