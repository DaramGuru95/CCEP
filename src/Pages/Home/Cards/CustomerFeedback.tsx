// import React from "react";
import CardLayout from "./CardLayout";
import { Box, Divider, Slider, Typography } from "@mui/material";
import CustomChip from "../../../Common/CustomChip";
import { CustomerFeedback as CustomerFeedbackProp } from "../../../Config/Store/Slices/reducers/homepage_reducers/cutomerFeedback_reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";

type Props = {};

const CustomerFeedback = () => {

  const { data: customerFeedback }: any = useSelector(
    (state: RootState) => state.getCustomerFeedbackReducer
  );


  const setColor = (value: number) => {
    if (value <= 45) {
      return "#ff0000";
    } else if (value > 45 && value <= 74) {
      return "#f99f35";
    } else {
      return "#51b82c";
    }
  };
  return (
    <CardLayout title="Customer  Feedback">
     
      <Box display={"flex"} flexDirection={"column"}  px={1}>
        <Box sx={{ display: "flex" }} gap={1} alignItems={"center"}>
          <Box>
            <Typography sx={{ fontSize: 12  }}>Recent</Typography>
          </Box>
          <CustomChip
            label="Last Week"
            color="#00769B"
            backgroundColor="rgb(240 249 255)"
          />
        </Box>
        <Box>
          <Slider
            disabled
            size="small"
            sx={{
              position:'relative',
              top:-5,
              margin: 0,
              height: 4,
              "& .MuiSlider-thumb": {
                display: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "gray",
              },
              "& .MuiSlider-track": {
                backgroundColor: setColor(
                  parseInt(`${customerFeedback?.recent_percentage}`)
                ),
                border: "none",
              },
            }}
            value={parseInt(`${customerFeedback?.recent_percentage}`)}
            // defaultValue={75}
          />
          <Typography
          gutterBottom
            variant="subtitle1"
            sx={{
              marginTop:-2,
              fontWeight: 600,
              color: setColor(
                parseInt(`${customerFeedback?.recent_percentage}`)
              ),
            }}
          >
            {customerFeedback?.recent_message}{" "}
            <span className="text-black font-semibold">
              - {customerFeedback?.recent_percentage}%
            </span>
          </Typography>
        </Box>
      </Box>
      <Divider light />

      <Box display={"flex"} flexDirection={"column"} marginTop={1} px={1}>
        <Box sx={{ display: "flex" }} gap={1} alignItems={"center"}>
          <Box>
            <Typography sx={{ fontSize: 12 }}>Overall</Typography>
          </Box>
          <CustomChip
            label={`${customerFeedback?.total_number_of_reviews} Reviews`}
            color="#00769B"
            backgroundColor="rgb(240 249 255)"
          />
        </Box>
        <Box>
          <Slider
            disabled
            aria-label="Default"
            valueLabelDisplay="auto"
            sx={{
              position:'relative',
              top:-5,
              height: 4,
              "& .MuiSlider-thumb": {
                display: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "gray",
              },
              "& .MuiSlider-track": {
                backgroundColor: setColor(
                  parseInt(`${customerFeedback?.overall_percentage}`)
                ),
                border: "none",
              },
            }}
            value={parseInt(`${customerFeedback?.overall_percentage}`)}
            // defaultValue={80}
          />
          <Typography
            sx={{
              // position:'relative',
              marginTop:-1,
              color: setColor(
                parseInt(`${customerFeedback?.overall_percentage}`)
              ),
              fontWeight: 600,
            }}
            component={"h3"}
          >
            {customerFeedback?.overall_message}{" "}
            <span className="text-black">
              - {customerFeedback?.overall_percentage}%
            </span>
          </Typography>
        </Box>
      </Box>
    </CardLayout>
  );
};

export default CustomerFeedback;
