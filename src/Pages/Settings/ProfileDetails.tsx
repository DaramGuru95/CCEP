import React, { useState } from "react";

import { Box, Divider, Typography, Button } from "@mui/material";
// import AgentImage from "../../assets/images/AgentImage.png";
import UserAvatar from "../../assets/images/UserAvatar.png";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Config/Store";
import { useSelector } from "react-redux";
import uploadImage from "../../Config/Store/Slices/actions/setting_actions/uploadImage";
// import userDetailsAction from "../../Config/Store/Slices/actions/setting_actions/profileDetails.actions";
import fetchUserImageAction from "../../Config/Store/Slices/actions/setting_actions/fetchImage";
import { setUserImageStart } from "../../Config/Store/Slices/reducers/profile_settings/fetchImage_reducer";
// import fetchUserImageAction from "../../Config/Store/Slices/actions/setting_actions/fetchImage";

// type Props = {};

const ProfileDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [imageUrl, setImageURL] = useState(null as any);
  const appState = useSelector((state: RootState) => state.appState);
  const { user_id } = appState;
  const {
    userDetails: { agent_details, profile_details },
  } = useSelector((state: RootState) => state.userDetails);

  const { userImage } = useSelector((state: RootState) => state.imageDetails);

  // console.log(agent_details, profile_details, "EMP");

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
      // var imgElement = document.getElementById("preview-image");
      setImageURL(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   if (user_id) {
  // dispatch(userDetailsAction(user_id));
  //   }
  // }, [dispatch, user_id]);

  // useEffect(() => {
  //   // debugger;
  //   dispatch(fetchUserImageAction(user_id));
  // }, [dispatch, user_id, profile_details]);

  // console.log("USer image details ------>", userImage, selectedImage);

  const saveImage = () => {
    const payload: any = { file: selectedImage, user_id };
    console.log(payload);
    dispatch(uploadImage(payload)).then(() => {
      if (user_id) dispatch(fetchUserImageAction(user_id));
    });
  };

  const resetImage = () => {
    setSelectedImage(null);
    setImageURL(null);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        background: "#ffffff",
        paddingLeft: 1,
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "16.3rem",
          borderRight: "1px solid #e6e9ea",
          p: 0.6,
          m: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", fontSize: "1rem", paddingBottom: 1 }}
        >
          {"Profile Details"}
        </Typography>
        <Typography sx={{ paddingBottom: 0.7, fontSize: "0.9rem" }}>
          <span style={{ fontWeight: 600 }}>{"Full Name :"}</span>{" "}
          {`${profile_details?.first_name} ${profile_details?.middle_name} ${profile_details?.last_name} `}
        </Typography>
        <Typography sx={{ paddingBottom: 0.7, fontSize: "0.9rem" }}>
          <span style={{ fontWeight: 600 }}>{"Email :"}</span>{" "}
          {profile_details?.email}
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", paddingBottom: 0.7 }}>
          <span style={{ fontWeight: 600 }}>{"Phone Number : "}</span>
          {profile_details?.mobile_number}
        </Typography>
        <Typography sx={{ paddingBottom: 3, fontSize: "0.9rem" }}>
          <span style={{ fontWeight: 600 }}>{"Job Title :"}</span>{" "}
          {profile_details?.job_title}
        </Typography>

        <Button sx={{ fontWeight: "bold" }}>{"Change Profile Info"}</Button>
        <Button sx={{ fontWeight: "bold" }}>{"Reset Password"}</Button>
      </Box>

      <Box sx={{ flex: 1, paddingLeft: 2 }}>
        <Box>
          <Typography
            sx={{ fontWeight: "bold", paddingTop: "1em", fontSize: "1rem" }}
          >
            {"Account Details"}
          </Typography>

          <Box sx={{ display: "flex", marginBottom: "1em", marginTop: "1em" }}>
            <Box>
              <img
                src={imageUrl ? imageUrl : userImage ? userImage : UserAvatar}
                alt="Agent Logo"
                style={{ height: "6.5rem", width: "6.5rem", borderRadius: 50 }}
              />
            </Box>

            <Box sx={{ marginLeft: "1em", paddingTop: "0.6rem" }}>
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold", fontSize: "0.9rem" }}
              >
                {"Profile Picture"}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  marginBottom: 3,
                  color: "#001E27",
                  opacity: "50%",
                  fontSize: "0.9rem",
                }}
              >
                {"PNG or JPG max size of 5 MB"}
              </Typography>
              <Button
                variant="text"
                component="label"
                style={{
                  fontWeight: "bold",
                  color: "#0096C5",
                  marginBottom: "1em",
                  fontSize: "0.8rem",
                }}
              >
                {"Change Photo"}
                <input
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              paddingTop: "1em",
            }}
          >
            {"Agent Details"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "5rem",
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {`Language`}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                {agent_details?.language}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Branch"}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                {agent_details?.branch}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Shift Timings"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.shift}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Region"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.region}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Designation"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.designation}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Joining Date"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.joining_date}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Reporting To"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.reporting_to || "Sourav Sinha"}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Department"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.department}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#66787d", fontSize: "0.8rem" }}
              >
                {"Employee ID"}
              </Typography>
              <Typography variant="subtitle1" fontSize={"0.9rem"}>
                {agent_details?.employee_id}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: 1,
            marginTop: 5,
            marginBottom: 3,
            marginRight: 1,
          }}
        >
          <Button
            sx={{
              height: "2rem",
              border: "1px solid #c0c8ca",
              marginRight: 1,
              background: "#f0f2f2",
              color: "#000",
            }}
            onClick={resetImage}
          >
            {"Cancel"}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: 3 }}
            onClick={saveImage}
          >
            {"Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
