import React, { useState } from "react";

/*MUI*/
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

//object and childs
import DetailedTicketForm from "./DetailedTicketForm";
import { commentObject } from "./detailedOptionsData";
import CommentHistory from "./CommentHistory";

//Assets
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Config/Store";

type Props = {
  setDialogContent: Function;
  handleClickOpen: Function;
};

const TicketDetails = (props: Props) => {
  const [loadMoreLess, setLoadMoreLess] = useState(2);
  const {currentTicketDetails} =  useSelector((state:RootState)=>state.selectedTicketDetails);


  const loadMoreLessOnClick = () => {
    if (commentObject.length === loadMoreLess) {
      setLoadMoreLess(2);
    } else setLoadMoreLess(commentObject.length);
  };

  return (
    <Box sx={{ background: "#fff", borderRadius: 1 }} flex={1} padding={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        marginY={0.5}
      >
        <Typography sx={{ padding: 1, fontWeight: 600 }}>
         {currentTicketDetails.subject}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            padding: 1,
          }}
        >
          <Button
            size="small"
            sx={{
              border: "1px solid #c0c8ca",
              background: "#F0F2F2",
              color: "#000",
              paddingX: 2,
              textTransform: "none",
            }}
            onClick={() => props.handleClickOpen()}
          >
            {"Reply"}
          </Button>
          <Button
            size="small"
            sx={{
              border: "1px solid #c0c8ca",
              background: "#F0F2F2",
              color: "#000",
              paddingX: 2,
              textTransform: "none",
            }}
          >
            {"Forward"}
          </Button>
        </Box>
      </Box>
      <DetailedTicketForm   />

      <Box sx={{ padding: 1 }}>
        <Typography variant="caption" sx={{ color: "#79898d" }}>
          Description
        </Typography>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          {currentTicketDetails?.description}
        </Typography>
        <Divider />
      </Box>

      <Box
        sx={{ padding: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#79898d" }}
        >
          DOCUMENT UPLOADED
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#79898d", paddingRight: 2 }}
        >
          View
        </Typography>
      </Box>

      <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">273486565784.pdf</Typography>
          <IconButton>
            <RemoveRedEyeOutlinedIcon sx={{ color: "primary" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">273486565784.pdf</Typography>
          <IconButton>
            <RemoveRedEyeOutlinedIcon sx={{ color: "main" }} />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <Box padding={1}>
        <Typography variant="subtitle2" sx={{ color: "#79898d" }}>
          Internal Comment
        </Typography>
        <OutlinedInput
          id="outlined-multiline-static"
          fullWidth
          multiline
          rows={2}
          endAdornment={
            <InputAdornment position="end">
              <Box display={"flex"} gap={2}>
                <Button
                  sx={{ textTransform: "none" }}
                  size="small"
                  variant="outlined"
                  startIcon={<AttachFileOutlinedIcon />}
                >
                  {"Attach"}
                </Button>
                <Button
                  sx={{ textTransform: "none" }}
                  size="small"
                  variant="contained"
                >
                  {"Comment"}
                </Button>
              </Box>
            </InputAdornment>
          }
          // defaultValue="Default Value"
          placeholder="Enter Text"
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Divider />

      <Typography
        variant="caption"
        sx={{ padding: 1, color: "#79898d", fontWeight: 550 }}
      >
        COMMENT HISTORY
      </Typography>

      {commentObject.slice(0, loadMoreLess)?.map((comment) => (
        <CommentHistory comment={comment} key={comment.timeStamp} />
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
        <Button
          onClick={loadMoreLessOnClick}
          endIcon={
            commentObject.length === loadMoreLess ? (
              <ArrowDropUpOutlinedIcon />
            ) : (
              <ArrowDropDownOutlinedIcon />
            )
          }
        >
          {" "}
          {commentObject.length === loadMoreLess ? "Load Less" : "Load More"}
        </Button>
      </Box>
    </Box>
  );
};

export default TicketDetails;
