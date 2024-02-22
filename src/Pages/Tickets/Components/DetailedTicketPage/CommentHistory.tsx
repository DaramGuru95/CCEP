import { Avatar, Box, Typography } from "@mui/material";
import timeAgo from "../../../../Helpers/relativeTime";

const CommentHistory = ({
    comment,
  }: {
    comment: {
      profileIcon: string;
      authorName: string;
      description: string;
      timeStamp: string;
    };
  }) => {
    const { profileIcon, authorName, description, timeStamp } = comment;
  
    return (
      <Box sx={{ display: "flex", gap: 1 }} padding={2}>
        <Box>
          <Avatar src={profileIcon} />
        </Box>
  
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">
            <span style={{ fontWeight: "bold" }}>{authorName}</span>{" "}
            {timeAgo(timeStamp)}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#79898d" }}>{description}</Typography>
        </Box>
      </Box>
    );
  };


  export default CommentHistory
  