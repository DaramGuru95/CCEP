import { Box, Chip, Typography } from "@mui/material";
import { ticketStatusDetails } from "./TicketDetailsObj";
import { PermIdentity } from "@mui/icons-material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMemo } from "react";

interface TicketStatusDetailsProps {
  data: {
    raisedBy: string;
    id: string;
    agent_name: string;
    createdOn: string;
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

const TicketStatusDetails: React.FC<TicketStatusDetailsProps> = ({
  data,
}: TicketStatusDetailsProps) => {
  const color = useMemo(() => {
    const colors: any = {
      high: "#E22853",
      low: "#00875F",
      medium: "#F99F35",
    };

    return colors[data.priority.toLocaleLowerCase()];
  }, [data.priority]);

  const bgColor = useMemo(() => {
    const colors: any = {
      high: "#FDEFED",
      low: "#EBF9EF",
      medium: "#FEF3D6",
    };

    return colors[data.priority.toLocaleLowerCase()];
  }, [data.priority]);

  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Box display={"flex"} flexDirection={"column"} height={"100%"} gap={0.5}>
        <Box>
          <Chip
            // color={color}
            label={
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="caption">{data.priority}</Typography>{" "}
                <ArrowDropDownIcon sx={{ color: "#001E2766",fontSize:16 }} />
              </Box>
            }
            size="small"
            variant="filled"
            // deleteIcon={}
            sx={{ border: "none", height: 18,bgcolor:bgColor,color:color }}
          />
        </Box>
        <Box>
          <Chip
            icon={<PermIdentity />}
            label={
              <Typography variant="caption">
                {ticketStatusDetails[0].ticketDescription}/
                <span style={{ color: "#54B2D0" }}>{data.agent_name}</span>
              </Typography>
            }
            size="small"
            variant="outlined"
            onClick={() => ""}
            onDelete={() => ""}
            deleteIcon={<ArrowDropDownIcon />}
            sx={{ border: "none" }}
          />
        </Box>
        <Box>
          <Chip
            icon={<BookmarkBorderOutlinedIcon />}
            label={"Open"}
            size="small"
            variant="outlined"
            onClick={() => ""}
            onDelete={() => ""}
            deleteIcon={<ArrowDropDownIcon />}
            sx={{ border: "none" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TicketStatusDetails;
