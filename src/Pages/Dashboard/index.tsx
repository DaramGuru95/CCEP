import { Box, Paper, Typography } from "@mui/material";
import AdvanceFilterLayout from "../../Common/AdvancedFilterHeader";
import DashboardFilterForm from "./DashboardFilterForm";
import { useState } from "react";
import ConversationByChannelChart from "./Charts/ConversationByChannelChart";
import { lineChartData } from "./Charts/ConversationByChannelChart/data";
import { Masonry } from "@mui/lab";
import AverageHandelingTime from "./Charts/AverageHandilingTime";
import { convoByStatus } from "./Charts/ConversationByStatus/data";
import ConversationByStatus from "./Charts/ConversationByStatus";
import { styled } from "@mui/material/styles";
import { ticketsByStatusData } from "./Charts/TicketsByStatus/data";
import TicketsByStatus from "./Charts/TicketsByStatus";
import CustomerSatisfaction from "./Charts/CustomerSatisfaction";

const masonryObject = [
  {
    id: 0,
    height: "50vh",
    width: "50%",
    title: "NUMBER OF CONVERSATION BY CHANNEL",
    chartData: lineChartData,
    chartComponent: ({ data }: { data: any }) => (
      <ConversationByChannelChart data={data} />
    ),
  },
  {
    id: 1,
    height: "45vh",
    width: "100%",
    title: "NUMBER OF TICKETS BY STATUS",
    chartData: ticketsByStatusData,
    chartComponent: ({ data }: { data: any }) => (
      <TicketsByStatus data={data} />
    ),
  },
  {
    id: 3,
    height: "20vh",
    width: "30vw",
    title: "AVERAGE HANDLING TIME",
    chartData: "3'30",
    chartComponent: ({ data }: { data: any }) => (
      <AverageHandelingTime handlingTime={data} />
    ),
  },
  {
    id: 2,
    height: "50vh",
    width: "40vw",
    title: "CONVERSATION STATUS",
    chartData: convoByStatus,
    chartComponent: ({ data }: { data: any }) => (
      <ConversationByStatus data={data} />
    ),
  },

  {
    id: 4,
    height: "22em",
    // width: "20em",
    title: "CUSTOMER SATISFACTION",
    chartData: convoByStatus,
    chartComponent: ({ data }: { data: any }) => <CustomerSatisfaction />,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [showHide, setShowHide] = useState(false);

  return (
    <Box width={"100%"}>
      <AdvanceFilterLayout showHide={showHide} setShowHide={setShowHide}>
        {showHide && <DashboardFilterForm />}
      </AdvanceFilterLayout>
      {/* <Box component={Paper} padding={1} marginTop={1}>
        <Typography variant="h6">
          {"NUMBER OF CONVERSATION BY CHANNEL"}
        </Typography>
        <Box width={"50vw"} height={"50vh"}>
          <MyResponsiveLine data={lineChartData} />
        </Box>
      </Box> */}

      {/* <Box height={"60vh"} width={"48%"} padding={2} component={Paper} my={2}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            marginLeft: 2,
            fontSize: 15,
            color: "#000",
            marginTop: 1,
          }}
        >
          TICKET TREND
        </Typography>
        <Box width={"100%"} height={"50vh"}>
          <ConversationByChannelChart data={lineChartData} />
        </Box>
      </Box> */}

      <Box width={"100%"} marginY={2}>
        <Masonry columns={2} spacing={3}>
          <Box
            height={"60vh"}
            width={"48%"}
            padding={2}
            component={Paper}
            my={2}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                marginLeft: 2,
                fontSize: 15,
                color: "#000",
                marginTop: 1,
              }}
            >
              TICKET TREND
            </Typography>
            <Box width={"100%"} height={"50vh"}>
              <ConversationByChannelChart data={lineChartData} />
            </Box>
          </Box>
          {masonryObject.map((item) => (
            <Item key={item.id} sx={{ height: item.height, width: item.width }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginLeft: 2,
                  fontSize: 15,
                  color: "#000",
                  marginTop: 1,
                }}
              >
                {item.title}
              </Typography>
              <Box height={"100%"} width={"100%"} padding={2}>
                {item.chartComponent &&
                  item.chartComponent({ data: item.chartData })}
              </Box>
            </Item>
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

export default Dashboard;
