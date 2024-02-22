import React from "react";
import CardLayout from "./CardLayout";
import { Grid, Link, Typography } from "@mui/material";
import CommonTicketStatusBox from "./CommonTicketStatusBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";
import { useNavigate } from "react-router-dom";

const TodaysTicketStatus = () => {
  const navigate = useNavigate();
  const { data: todayTicket } = useSelector(
    (state: RootState) => state.getTodayTicketReducer
  );

  return (
    <CardLayout title={`Today's Tickets Status`}>
      <Grid container columnGap={2} rowGap={1}>
        <CommonTicketStatusBox
          primaryText={
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/tickets");
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {todayTicket?.overdue[0][0] || 0}{" "}
              </Typography>
            </Link>
          }
          secondaryText="Overdue"
          borderColor="#F6B5AF"
          boxfor="status"
        />
        <CommonTicketStatusBox
          primaryText={
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/tickets");
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {todayTicket?.due_today[0][0] || 0}{" "}
              </Typography>
            </Link>
          }
          secondaryText="Due Today"
          borderColor="#FFE3B3"
          boxfor="status"
        />
        <CommonTicketStatusBox
          primaryText={
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/tickets");
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {todayTicket?.open_tickets[0][0] || 0}{" "}
              </Typography>
            </Link>
          }
          secondaryText="Open"
          borderColor="#B3E0EE"
          boxfor="status"
        />
        <CommonTicketStatusBox
          primaryText={
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/tickets");
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {todayTicket?.resolved_tickets[0][0] || 0}{" "}
              </Typography>
            </Link>
          }
          secondaryText="Resolved"
          borderColor="#CBEAC0"
          boxfor="status"
        />
      </Grid>
    </CardLayout>
  );
};

export default TodaysTicketStatus;
