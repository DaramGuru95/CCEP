import React from "react";
import { Box, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import moment from "moment";
import { convertDate } from "../../../../../Helpers/dateUtils";

type Props = {
  createdOn: string | number;
  customerName: string;
  tat: string;
};

const CellFooter = ({ createdOn, customerName, tat }: Props) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{ color: "#001E27CC" }}
      gap={0.5}
      width={"100%"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={0.5}
        sx={{ fontWeight: "bold" }}
      >
        <EmailOutlinedIcon sx={{ fontSize: "14px" }} />
        <Typography sx={{ fontSize: "small", textAlign: "center" }}>
          {`${customerName}`}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#001E27CC" }}>
          {/* {`• Created: ${moment(new Date(createdOn).toDateString()).fromNow()}`} */}
          {`• Created : ${convertDate(createdOn)}`}
        </Typography>
        <Typography
          sx={{ fontSize: "small" }}
        >{` • First response due in : ${tat}`}</Typography>
      </Box>
    </Box>
  );
};

export default CellFooter;
