import { Box, IconButton, Typography } from "@mui/material";

import ContactDetailsBar from "./ContactDetailsBar";
import TicketDetails from "./DetailedTicketPage";
import { MutableRefObject, useRef, useState } from "react";
import TicketActivityDetails from "../TicketHistoryInformation/TicketActivityDetails";
import { ticketsSideNavItems } from "./detailedOptionsData";
import CustomizedDialogs from "../../../../Common/DialogModal";
import Reply from "../ReplyPopup";

const forwardReplyObj = [
  {
    id: 0,
    text: "Reply",
    dialogContent: <Reply />,
    submitButtonText: "Submit",
    buttonIcon: null,
    submitButtonFunction: () => console.log("Export Button Clicked"),
  },
];

const DetailedTicketPage = () => {
  const [viewActivity, setViewActivity] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

  const infoRef = useRef<HTMLDivElement>(null);
  const recentSessionRef= useRef<HTMLDivElement>(null);
  const timeLineRef =  useRef<HTMLDivElement>(null);
  const jiraRef =  useRef<HTMLDivElement>(null);
  const parentChildRef =  useRef<HTMLDivElement>(null);


  const refObj={
    0:infoRef,
    1:timeLineRef,
    2:parentChildRef,
    3:recentSessionRef,
    4:jiraRef
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any, item: {}) => {
    setDialogContent(forwardReplyObj[0]);
    setOpen(true);
  };

  return (
    <Box
      display={"flex"}
      gap={1.5}
      sx={{ position: "absolute" }}
      paddingY={1.5}
    >
      {viewActivity ? (
        <TicketActivityDetails />
      ) : (
        <TicketDetails
          setDialogContent={setDialogContent}
          handleClickOpen={handleClickOpen}
        />
      )}
      <ContactDetailsBar
        viewActivity={viewActivity}
        setViewActivity={setViewActivity}
        infoRef={infoRef}
        jiraRef={jiraRef}
        recentSessionRef={recentSessionRef}
        timeLineRef={timeLineRef}
        parentChildRef={parentChildRef}
      />
      <Box
        width={"5vw"}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          position: "relative",
          right: 0,
          gap: 2,
          pt: 1,
        }}
      >
        {ticketsSideNavItems.map((item: any,index:number) => {
          return (
            <Box
              key={item.id}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <IconButton size="small" onClick={()=>{
                // item.ref.current.scrollIntoView({ behavior: 'smooth' })
                if(!index){
                  infoRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }
               else if(index===1){
                  timeLineRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }
                else if(index===2){
                  parentChildRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }
                else if(index===3){
                  recentSessionRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }
                else if(index===4){
                  jiraRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }
              }} >{item.icon}</IconButton>
              <Typography
                variant="subtitle2"
                sx={{
                  wordWrap: "break-word",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        dialogContent={dialogContent}
        isAttachment={false}
        attachmentClickFunction
      />
    </Box>
  );
};

export default DetailedTicketPage;
