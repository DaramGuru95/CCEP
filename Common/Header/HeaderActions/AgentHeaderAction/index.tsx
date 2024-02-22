// import React from "react";
import { Button, Box, Divider, Tooltip } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";
import { InfoOutlined } from "@mui/icons-material";

type Props = {};

const AgentHeaderActions = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      width={"14vw"}
      alignItems={"center"}
      paddingTop={1}
      sx={{ marginTop: "-25px" }}
    >
      <Button
        startIcon={<WestIcon />}
        onClick={() => navigate(-1)}
        sx={{
          background: "#fff",
          color: "#000",
          border: 1,
          borderColor: "#001E2733",
          textTransform: "none",
          width: "6rem",
        }}
        size="small"
      >
        {"Go Back"}
      </Button>
      <Divider orientation="vertical" flexItem />
      <Tooltip title={"Agent Console"}>
        <InfoOutlined sx={{ width: 20, height: 20, color: "divider" }} />
      </Tooltip>
    </Box>
  );
};

export default AgentHeaderActions;
