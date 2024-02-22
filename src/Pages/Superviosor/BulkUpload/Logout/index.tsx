// import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import UserAvatar from "../../../../assets/images/UserAvatar.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

type Props = {};

const SupervisorLogout = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          //   src={userImage ? userImage : UserAvatar}
          src={UserAvatar}
          alt="Agent Logo"
          style={{ height: "3.5rem", width: "3.5rem", borderRadius: 50 }}
        />
        <Typography variant="subtitle1">{"Sourav Kumar"}</Typography>
        <Typography variant="subtitle1">{"sourav.kr@gmail.com"}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          paddingTop: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoutOutlinedIcon />
        <Typography>{"Logout"}</Typography>
      </Box>
    </Box>
  );
};

export default SupervisorLogout;
