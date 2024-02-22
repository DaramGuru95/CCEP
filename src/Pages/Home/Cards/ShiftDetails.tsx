import React from "react";
import CardLayout from "./CardLayout";
import { Paragraph } from "../../../Components/ui/paragraph/paragraph";
import { Divider, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Config/Store";
import { useDispatch } from "react-redux";
import { postcurrentAvailabilityAction } from "../../../Config/Store/Slices/actions/homepage_actions/currentAvailability_action";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));



const ShiftDetails = () => {

  const dispatch :AppDispatch   =  useDispatch()
  const { data: shiftDetails } = useSelector(
    (state: RootState) => state.getShiftDetailsReducer
  );



  const { data: [current_availability] }: any = useSelector(
    (state: RootState) => state.currentAvailability
  );



  const handleChangeAvailability = () => {
    dispatch(postcurrentAvailabilityAction());
  };

    
  return (
    <CardLayout title="Shift Details">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: 12, fontWeight: 400, color: "#4B5563" }}
          >
            {"Date"}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {shiftDetails?.date || new Date().toLocaleDateString()}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: 12, fontWeight: 400, color: "#4B5563" }}
          >
            {"Shift Timing"}
          </Typography>
          <Typography sx={{ fontWeight: 600 }} gutterBottom>
            {shiftDetails?.shift_timing || "00.00 pm - 00.00 pm"}
          </Typography>
        </Box>

        <Divider />
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Typography sx={{ fontWeight: 400 }}>
            {"Current Availablity"}
          </Typography>

          <AntSwitch
          onChange={handleChangeAvailability}
           checked={current_availability}

          />
        </Box>
      </Box>
    </CardLayout>
  );
};

export default ShiftDetails;
