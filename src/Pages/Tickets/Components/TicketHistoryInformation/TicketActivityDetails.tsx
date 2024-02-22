import { Box, Typography } from "@mui/material";

// import { useParams } from "react-router-dom";
import CustomTimeLine, { timeLineObj } from "./TimeLine";
// import { time } from "console";

const TicketActivityDetails = () => {
  // const params = useParams();
  // console.log(params, "contact");

  return (
    <Box sx={{ display: "flex", m: 2, gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          background: "#fff",
        }}
      >
        <Box>
          <Box sx={{ background: "#fff", m: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, p: 1 }}>
              {"ACTIVITY DETAILS"}
            </Typography>

            <Box>
              {timeLineObj?.map((timeline) => (
                <CustomTimeLine
                  key={timeline.date}
                  time={timeline.time}
                  date={timeline.date}
                  description={timeline.description}
                  ticketTitle={timeline.ticketTitle}
                  priority={timeline.priority}
                  status={timeline.status}
                  group={timeline.group}
                  agent={timeline.agent}
                  created={timeline.created}
                  fistResponse={timeline.fistResponse}
                  ticketStatus={timeline.ticketStatus}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketActivityDetails;
