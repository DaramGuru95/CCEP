import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import TodayIcon from "@mui/icons-material/Today";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import JiraImage from "../../../../assets/images/JiraImage.png";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../Config/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import customer360Action from "../../../../Config/Store/Slices/actions/agent_console_action/customer_360_action";
import { getLocalStorage } from "../../../../Helpers/commonHelper";
import { useSelector } from "react-redux";

type Props = {
  viewActivity: boolean;
  setViewActivity: Function;
  infoRef: any;
  recentSessionRef: any;
  timeLineRef: any;
  jiraRef: any;
  parentChildRef: any;
};

const ContactDetailsBar = ({
  viewActivity,
  setViewActivity,
  infoRef,
  recentSessionRef,
  timeLineRef,
  jiraRef,
  parentChildRef,
}: Props) => {
  const { ticketId } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );
  // const { getTicketdata } = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    const conv_session_id = getLocalStorage("conv_session_id");
    dispatch(customer360Action(conv_session_id));
  }, [dispatch]);

  console.log(data, "customer360");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      sx={{ overflowY: "auto" }}
    >
      <Box sx={{ background: "#fff" }} ref={infoRef}>
        <Box sx={{ display: "flex", gap: 3, m: 2 }}>
          <AccountCircleOutlinedIcon sx={{ color: "#AFB8BB" }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, fontSize: 14 }}
            >
              {"CONTACT DETAILS"}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 2.5, height: "1.7rem", borderRadius: 3 }}
            />
          </Box>
          <Box>
            <ArrowDropUpOutlinedIcon sx={{ color: "#99A5A9" }} />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              display: "flex",
              height: "3rem",
              width: "3rem",
              background: "#B3E0EE",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              margin: 1,
              fontWeight: "bold",
              color: "#0096C5",
            }}
          >
            {data?.first_name?.charAt(0)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {`${data?.first_name} ${data?.last_name}`}
            </Typography>
            <Typography variant="subtitle1">
              {" "}
              <EmailOutlinedIcon sx={{ fontSize: 16, paddingRight: 0.2 }} />
              {/* {getTicketdata?.alt_email} */}
              {data?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <IconButton>
            <OutputOutlinedIcon sx={{ color: "#0096C5" }} />
          </IconButton>
          <Box
            component={Link}
            sx={{ color: "#0096C5", fontWeight: 600, fontSize: "1rem" }}
            to={`/tickets/${ticketId}/info/${data?.first_name} ${data?.last_name}`}
          >
            {"View more info"}
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            p: 1,
            fontFamily: "inter",
            color: "#001E2780",
          }}
          ref={timeLineRef}
        >
          {"TIMELINE"}
        </Typography>
        <BasicTimeline
          viewActivity={viewActivity}
          setViewActivity={setViewActivity}
        />
      </Box>
      <Box
        sx={{ background: "#BDBDBD", pl: 1, borderRadius: 1.5 }}
        ref={recentSessionRef}
      >
        <RecentSessions />
      </Box>
      <Box
        sx={{ background: "#BDBDBD", pl: 1, mt: 1, borderRadius: 1.5 }}
        ref={parentChildRef}
      >
        <ParentChaild />
      </Box>
      <Box
        sx={{ background: "#BDBDBD", pl: 1, mt: 1, borderRadius: 1.5 }}
        ref={jiraRef}
      >
        <Jira />
      </Box>
    </Box>
  );
};

export default ContactDetailsBar;

type ActivityProps = {
  viewActivity: boolean;
  setViewActivity: Function;
};

function BasicTimeline(props: ActivityProps) {
  const { viewActivity, setViewActivity } = props;
  return (
    <Box>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{ background: "#51B82C", width: "1.1rem", height: "1.1rem" }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ fontSize: 11.5 }}>
            <span style={{ fontWeight: "bold" }}>{"UPDATE2 . "}</span>
            {"13 JUL 2023"}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "#AFB8BB", fontSize: 12.3 }}
              >
                {"Status"}
              </Typography>
            </Box>
            <Button
              sx={{
                color: "#F99F35",
                fontWeight: 600,
                background: "#FEF3D6",
                borderRadius: 6,
                height: "1.5rem",
                fontSize: 13,
              }}
            >
              {"Transferred"}
            </Button>
            <Typography sx={{ color: "#AFB8BB", fontSize: 12.3 }}>
              {"Comment"}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
              {"ISSUE FIXED BY L1 TEAM,"} <br />
              {"SENDING TO FINANCE TEAM"}
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{ background: "#0096C5", width: "1rem", height: "1rem" }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ fontSize: 11.5 }}>
            <span style={{ fontWeight: "bold" }}>{"UPDATE1 ."} </span>
            {"11 JUL 2023"}
            <Typography
              variant="subtitle2"
              sx={{ color: "#AFB8BB", fontSize: 12.3 }}
            >
              {"Status"}
            </Typography>
            <Button
              sx={{
                color: "#F99F35",
                fontWeight: 600,
                background: "#FEF3D6",
                borderRadius: 6,
                height: "1.5rem",
                fontSize: 13,
              }}
            >
              {"Assigned"}
            </Button>
            <Typography
              variant="subtitle1"
              sx={{ color: "#000", fontWeight: 400, fontSize: 14 }}
            >
              {"Assigned To"}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
              {"12 JAN 2023 SOURAV SHARMA"}
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{ background: "#0096C5", width: "0.5rem", height: "0.6rem" }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <span style={{ fontWeight: 600, fontSize: 14 }}>
              {"ISSUE REPORTED ."}{" "}
            </span>
            {"11 JUL 2023"}
            <Typography
              variant="subtitle2"
              sx={{ color: "#AFB8BB", fontSize: 11.5 }}
            >
              {"Status"}
            </Typography>
            <Button
              sx={{
                color: "#F99F35",
                fontWeight: 600,
                background: "#FEF3D6",
                borderRadius: 6,
                height: "1.5rem",
              }}
            >
              {"Unassigned"}
            </Button>
            <Typography
              variant="subtitle2"
              sx={{ color: "#AFB8BB", fontSize: 11.5 }}
            >
              {"Comment"}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
              {"LAST 5 AMAZON TRANSACTIONS"}
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{ background: "#0096C5", width: "1px", height: "2px" }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="subtitle2"
              sx={{ color: "#334b52", fontWeight: 400, fontSize: 14 }}
            >
              {"Reported by"}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
              {"12 JAN 2023 JOHN SMITH"}
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent sx={{ color: "#0096C5", fontWeight: 600 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "primary",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setViewActivity(true)}
            >
              {"View All Activity"}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

function RecentSessions() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        m: 1,
      }}
    >
      <TodayIcon sx={{ fontWeight: "bold", fontSize: 20 }} />
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        {"RECENT SESSIONS"}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ fontWeight: "bold", marginLeft: 2, fontSize: 11 }}
      >
        {"Comming Soon"}
      </Typography>
      <ArrowDropDownOutlinedIcon sx={{ marginRight: 2, color: "#99A5A9" }} />
    </Box>
  );
}

function ParentChaild() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          m: 1,
        }}
      >
        <AccountTreeOutlinedIcon sx={{ fontWeight: "bold", fontSize: 20 }} />
        <Typography sx={{ fontWeight: "bold", fontSize: "0.9em" }}>
          {"PARENT CHILD"}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontWeight: "bold", marginLeft: 2, fontSize: 11 }}
        >
          {"Comming Soon"}
        </Typography>
        <ArrowDropUpOutlinedIcon sx={{ marginRight: 2, color: "#99A5A9" }} />
      </Box>
      <Divider />
      <Box>
        <Typography variant="subtitle1" sx={{ p: 1, fontSize: 13.5 }}>
          <span style={{ color: "#0096C5", textDecoration: "underline" }}>
            {"Create child ticket"}
          </span>{" "}
          {"or"}
          <br />{" "}
          <span style={{ color: "#0096C5", textDecoration: "underline" }}>
            {"Add child using templates"}
          </span>{" "}
          {"or"} <br />
          <span style={{ color: "#0096C5", textDecoration: "underline" }}>
            {"Link to a parent"}
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

function Jira() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          m: 1,
        }}
      >
        <img src={JiraImage} alt="Jira Logo" />
        <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          {"JIRA"}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontWeight: "bold", marginRight: 2, fontSize: 11 }}
        >
          {"Comming Soon"}
        </Typography>
        <ArrowDropUpOutlinedIcon sx={{ marginRight: 2, color: "#99A5A9" }} />
      </Box>
      <Divider />
      <Box sx={{ display: "flex", p: 1, gap: 1, m: 1 }}>
        <Button
          disabled
          variant="contained"
          size="medium"
          sx={{ width: "100%", fontSize: 12 }}
        >
          {"Create Issue"}
        </Button>
        <Button
          disabled
          variant="outlined"
          size="medium"
          sx={{ color: "#000", width: "100%", fontSize: 12 }}
        >
          {"Link Issue"}
        </Button>
      </Box>
    </Box>
  );
}
