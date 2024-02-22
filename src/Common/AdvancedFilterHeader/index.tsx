import React from "react";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  showHide: boolean;
  setShowHide: Function;
  children: React.ReactNode;
};

const AdvanceFilterLayout = (props: Props) => {
  const showHideOnClick = () => {
    props.setShowHide(!props.showHide);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 1.2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 12.5 }}
          fontWeight={"bold"}
        >
          ADVANCED FILTERS
        </Typography>
        <Button
          size="small"
          onClick={showHideOnClick}
          sx={{
            backgroundColor: "#F0F2F2",
            color: "#000",
            borderColor: "#b3bcbe",
            padding: "1.2em 2em",
            border: "1.8px solid #b3bcbe",
            fontSize: 10,
            height: "1rem",
            maxWidth: "100%",
            borderRadius: 1,
            textTransform: 'none'
          }}
        >
          {"Show/Hide"}
        </Button>
      </Box>
      {props.children}
    </Box>
  );
};

export default AdvanceFilterLayout;
