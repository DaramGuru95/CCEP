import React from "react";
import CardLayout from "./CardLayout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";

import WhatAppIcon from "../../../assets/icons/whatsapp.svg";
import EmailIcon from "../../../assets/icons/emailicon.svg";
import IMessage from "../../../assets/icons/imessage.svg";
import Telegram from "../../../assets/icons/telegram.svg";
import CommonTicketStatusBox from "./CommonTicketStatusBox";
import TrusttLogo from "../../../assets/logo/trustt-logo.svg";

type Props = {};

const ConversationStats = (props: Props) => {
  const { data: conversationStat } = useSelector(
    (state: RootState) => state.getConversationStatReducer
  );

  return (
    <CardLayout title="Conversation Stats">
      <Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: 12, fontWeight: 400, color: "#4B5563" }}
        >
          {"No. of  conversation attended today"}
        </Typography>
        <Typography
          component={Box}
          display={"flex"}
          sx={{ fontWeight: 600 }}
          gap={1}
        >
          <>{`Total - ${conversationStat?.total_no_of_conv || 0}`}</>
          <Divider orientation="vertical" flexItem />
          <>{`Chats - ${conversationStat?.total_no_of_chat || 0}`}</>
          <Divider orientation="vertical" flexItem />
          <>{`Call - ${conversationStat?.total_no_of_call || 0}`}</>
        </Typography>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "flex-end",
            // paddingRight: 1.5,
          }}
        >
          <Typography
            component={Box}
            display={"flex"}
            sx={{ fontWeight: 600, fontSize: "12px" }}
            gap={1}
          >
            <>
              {" "}
              <img
                src={TrusttLogo}
                width={16}
                className="inline-block text-xs"
                alt="whatsappIcon"
              />{" "}
              {` - ${
                conversationStat?.total_no_of_conv_trustt_customer_app || 0
              }`}
            </>
            <Divider orientation="vertical" flexItem />
            <>
              {" "}
              <img
                src={EmailIcon}
                width={16}
                className="inline-block"
                alt=""
              />{" "}
              {` - ${conversationStat?.total_no_of_email || 0}`}
            </>
            <Divider orientation="vertical" flexItem />
            <>
              <img src={IMessage} width={16} className="inline-block" alt="" />{" "}
              {` - ${conversationStat?.total_no_of_messenger || 0}`}
            </>
            <Divider orientation="vertical" flexItem />
            <>
              <img
                src={WhatAppIcon}
                width={16}
                className="inline-block"
                alt=""
              />{" "}
              {` - ${conversationStat?.total_no_of_whats_app || 0}`}
            </>
          </Typography>
        </Box>
        <Divider sx={{ marginY: 1 }} />
        <Grid
          container
          display={"row"}
          justifyContent={"space-between"}
          marginTop={1.5}
        >
          <CommonTicketStatusBox
            primaryText={conversationStat?.average_time_conv || "00:00 min"}
            secondaryText="Avg time/conv"
            borderColor="#93DFFC"
            boxfor="stats"
          />
          <CommonTicketStatusBox
            primaryText={conversationStat?.total_duration_conv || "00:00 min"}
            secondaryText="Total time of conv"
            borderColor="#4BB3F6"
            boxfor="stats"
          />
        </Grid>
      </Box>
    </CardLayout>
  );
};

export default ConversationStats;
