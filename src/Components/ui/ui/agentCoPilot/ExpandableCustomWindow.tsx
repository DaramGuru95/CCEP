import React, { Children } from "react";
import { Box, Paper, IconButton } from "@mui/material";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ChatNav } from "../chat-header/ChatNav";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { useLocation } from "react-router-dom";

const ExpandableCustomWindow = ({
  children,
  windowTitle,
  titleIcon,
  header,
  leftIcon,
  righticon,
  righticon2,
}: {
  children: React.ReactNode;
  windowTitle: string;
  titleIcon?: any;
  header?: any;
  leftIcon?: string;
  righticon?: string;
  righticon2?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      height={open ? "90vh" : "40vh"}
      component={Paper}
      // elevation={1}
      position="relative"
      sx={{ overflow: "hidden" }}
    >
      <Box
        className="shadow-md"
        height={"10vh"}
        width={"100%"}
        // component={Paper}
        // elevation={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div className={`flex-1  truncate flex flex-col`}>
          <ChatNav
            source={leftIcon}
            name={windowTitle}
            type={""}
            righticon={righticon}
            righticon2={righticon2}
          />
        </div>
      </Box>
      <Box padding={1}>{children}</Box>
      <IconButton
        size="small"
        sx={{
          transform: "rotate(45deg)",
          position: "absolute",
          bottom: 0,
          right: 15,
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <UnfoldLessIcon sx={{ width: 18, height: 18 }} />
        ) : (
          <UnfoldMoreIcon sx={{ width: 18, height: 18 }} />
        )}
      </IconButton>
    </Box>
  );
};

export default ExpandableCustomWindow;
