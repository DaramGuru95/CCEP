import { Box, Typography } from "@mui/material";
import UserAvatar from "../../../../assets/images/UserAvatar.png";
import CustomTimeLine, { timeLineObj } from "./TimeLine";
import ExpandableBoxes from "../../../AgentChat/ExpandableBoxes";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Config/Store";
import { useEffect, useState } from "react";
import uploadImage from "../../../../Config/Store/Slices/actions/setting_actions/uploadImage";
import fetchUserImageAction from "../../../../Config/Store/Slices/actions/setting_actions/fetchImage";
import userDetailsAction from "../../../../Config/Store/Slices/actions/setting_actions/profileDetails.actions";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../../Helpers/commonHelper";
import customer360Action from "../../../../Config/Store/Slices/actions/agent_console_action/customer_360_action";

const TicketMoreInformation = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userImage } = useSelector((state: RootState) => state.imageDetails);
  const [imageUrl, setImageURL] = useState(null as any);
  const [selectingImage, setSelectedImage] = useState<any>([]);

  const { data } = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );

  useEffect(() => {
    const conv_session_id = getLocalStorage("conv_session_id");
    dispatch(customer360Action(conv_session_id));
  }, [dispatch]);

  const { data: ticketHistory } = useSelector(
    (state: RootState) => state.tickets
  );

  const customerData = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );

  const { data: custConvHistory }: any = useSelector(
    (state: RootState) => state.getCustConvHistoryReducer
  );

  const appState = useSelector((state: RootState) => state.appState);
  const { user_id } = appState;

  const customer360: any = customerData.data;

  useEffect(() => {
    if (user_id) {
      dispatch(userDetailsAction(user_id));
    }
  }, [dispatch, user_id]);
  useEffect(() => {
    dispatch(fetchUserImageAction(user_id));
  }, [dispatch, user_id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      convertFileToUrl(file);
    }
  };

  const convertFileToUrl = (file: any) => {
    var reader = new FileReader();
    reader.onload = function (event: any) {
      setImageURL(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const saveImage = () => {
    const payload: any = { file: selectingImage, user_id };
    console.log(payload);
    dispatch(uploadImage(payload)).then(() => {
      if (user_id) dispatch(fetchUserImageAction(user_id));
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          background: "#fff",
          borderRadius: 1,
        }}
        width={"100%"}
      >
        <Box sx={{ display: "flex", gap: 1, m: 1 }}>
          <Box>
            <img
              src={imageUrl ? imageUrl : userImage ? userImage : UserAvatar}
              alt="Agent Logo"
              style={{ height: "6.5rem", width: "6.5rem", borderRadius: 50 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              {`${data?.first_name} ${data?.last_name}`}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#7F8E92", fontSize: "0.8rem" }}
            >
              {"PNG or JPG max size of 5 MB"}
            </Typography>
            <Typography
              variant="subtitle1"
              component="label"
              style={{
                fontWeight: "bold",
                color: "#0096C5",
                marginBottom: "1em",
                fontSize: "0.8rem",
                cursor: "pointer",
                paddingTop: 3,
              }}
              onClick={saveImage}
            >
              {"Upload Photo"}
              <input
                type="file"
                hidden
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", p: 1 }}>
              {"TIMELINE"}
            </Typography>
            <Box>
              {timeLineObj?.map((timeline) => (
                <CustomTimeLine
                  key={timeline.date}
                  time={timeline.time}
                  date={timeline.date}
                  description={timeline.description}
                  ticketTitle={timeline.ticketTitle}
                  priority={timeline.priority}
                  status={timeline.status}
                  group={timeline.group}
                  agent={timeline.agent}
                  created={timeline.created}
                  fistResponse={timeline.fistResponse}
                  ticketStatus={timeline.ticketStatus}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "30rem" }}>
        <ExpandableBoxes
          custConvHistory={custConvHistory}
          customer360={customer360}
          // ticketHistory={ticketHistory}
          // ticketHistory={
          //   ticketHistory && ticketHistory.data ? ticketHistory.data : []
          // }
        />
      </Box>
    </Box>
  );
};

export default TicketMoreInformation;
