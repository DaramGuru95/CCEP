import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FromHiestReviews from "../../../assets/images/FromHiestReviews.png";
import FromMediumReviews from "../../../assets/images/FromMediumReviews.png";
import FromLowReviews from "../../../assets/images/FromLowReviews.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";
import { updateFeedbackFormData } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/agentCustFeedback_reducers";
import { useDispatch } from "react-redux";

type Props = {
  handleFeedbackForm: any;
  setFeedbackFormData: any;
};

const Feedback = (props: Props) => {
  const [status, setStatus] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");
  const [feedbackForm, setFeedbackForm] = React.useState({
    status: "",
    selectedRating: selectedRating,
    remarks: "",
    resolve: "",
    reason: "",
  });

  const { data: customerFeedback } = useSelector(
    (state: RootState) => state.getAgentCustFeedbackReducer
  );
  const dispatch = useDispatch();
  const {
    isLoading,
    status: feedbackStatus,
    formData: feedbackFormData,
  } = useSelector((state: RootState) => state.getAgentCustFeedbackReducer);

  const handleChangeForm = (event: any, field: string) => {
    if (field == "selectedRating") {
      setFeedbackForm({
        ...feedbackForm,
        [field]: event as any,
      });
      dispatch(updateFeedbackFormData({ [field]: event }));
      return;
    }
    setFeedbackForm({
      ...feedbackForm,
      [field]: event.target.value as any,
    });
    dispatch(updateFeedbackFormData({ [field]: event.target.value }));
  };
  useEffect(() => {
    console.log(feedbackFormData, "feedbackForm");
    // props.setFeedbackFormData(feedbackForm);
  }, [feedbackFormData]);
  return (
    <div>
      <Box padding={1} sx={{ background: "#F5F6FB" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Customer Happiness
        </Typography>
        <div className="w-full  flex flex-row justify-between">
          <div className="flex-1 ms-2">
            <p className=" fs-10 text-gray-400 p-1 truncate dark:text-gray-400">
              <TimerIcon color={"error"} sx={{ marginRight: 1 }} />
              <span className="font-semibold">
                {" "}
                {customerFeedback?.conv_time?.conversation_time}
              </span>
            </p>
            <p className="fs-10 ml-1  font-semibold ">Conversation Time</p>
          </div>
          <div className="flex-1 ms-2">
            <p className=" fs-10 text-gray-400 p-1 truncate dark:text-gray-400">
              <TimerIcon sx={{ marginRight: 1, color: "#2bb3ae" }} />
              {customerFeedback?.hold_time}
              <span className="font-semibold"></span>
            </p>
            <p className="fs-10 ml-1  font-semibold ">Waiting Time</p>
          </div>
          <div className="flex-1 ms-2">
            <p className=" text-gray-400 p-1 truncate dark:text-gray-400">
              {customerFeedback?.last_feedback == "Neutral" && `😐`}
              <span className=" fs-10 font-semibold">
                {" "}
                {customerFeedback?.last_feedback}
              </span>
            </p>
            <p className="fs-10 ml-1  font-semibold ">Last Sentiment</p>
          </div>
        </div>
      </Box>
      <Divider />
      <Box marginTop={2}>
        <div className="grid grid-cols-2 gap-1">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <label htmlFor="" className="text-xs text-gray-500">
              Reason for calling
            </label>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={status}
              // onChange={handleChange}
              value={feedbackForm.reason}
              onChange={(e: any) => handleChangeForm(e, "reason")}
              displayEmpty
            >
              <MenuItem value={""}>Select</MenuItem>
              <MenuItem value={"Information Update"}>
                Information Update
              </MenuItem>
              <MenuItem value={"Enquiry"}>Enquiry</MenuItem>
              <MenuItem value={"Ticked Raised"}>Ticked Raised</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <label htmlFor="" className="text-xs text-gray-500">
              Was Query resolved?
            </label>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={status}
              // onChange={handleChange}
              value={feedbackForm.resolve}
              onChange={(e: any) => handleChangeForm(e, "resolve")}
              displayEmpty
            >
              <MenuItem value={""}>Select</MenuItem>
              <MenuItem value={"yes"}>Yes</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </Select>
          </FormControl>
          <div className="m-2 flex flex-col">
            <label htmlFor="" className="text-xs text-gray-500">
              Rate the Customer
            </label>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box>
                <Button
                  onClick={() => {
                    setSelectedRating("positive");
                    handleChangeForm("positive", "selectedRating");
                  }}
                >
                  <img
                    src={FromHiestReviews}
                    alt="emojies"
                    onClick={() => "Emoji Clicked"}
                    // style={{ cursor: "pointer" }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRating === "positive"
                          ? "#BBD0F7"
                          : "transparent",
                    }}
                  />
                </Button>
                <Typography>Positive</Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => {
                    setSelectedRating("neutral");
                    handleChangeForm("neutral", "selectedRating");
                  }}
                >
                  <img
                    src={FromMediumReviews}
                    alt="emojies"
                    onClick={() => "Emoji Clicked"}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRating === "neutral"
                          ? "#FEF3C7"
                          : "transparent",
                    }}

                    // style={{ cursor: "pointer" }}
                  />
                </Button>
                <Typography>Neutral</Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => {
                    setSelectedRating("negative");
                    handleChangeForm("negative", "selectedRating");
                  }}
                >
                  <img
                    src={FromLowReviews}
                    alt="emojies"
                    onClick={() => "Emoji Clicked"}
                    // style={{ cursor: "pointer" }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRating === "negative"
                          ? "#FECDD3"
                          : "transparent",
                    }}
                  />
                </Button>
                <Typography>Negative</Typography>
              </Box>
            </Box>
          </div>
        </div>
        <FormControl sx={{ m: 1 }} fullWidth size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Remarks
          </label>
          <TextField
            value={feedbackForm.remarks}
            onChange={(e: any) => handleChangeForm(e, "remarks")}
            placeholder="Please describe the issue"
            multiline
            fullWidth
          />
        </FormControl>
      </Box>
    </div>
  );
};

export default Feedback;
