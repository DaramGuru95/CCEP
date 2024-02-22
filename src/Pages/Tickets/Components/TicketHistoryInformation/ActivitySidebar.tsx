// import React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AdharMasking from "../../../../assets/icons/adhar_masking.svg";
import TicketIcon from "../../../../assets/icons/ticketing.svg";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

type Props = {};

const ActivitySidebar = (props: Props) => {
  return (
    <Box sx={{ borderRadius: 2, width: "26rem" }}>
      <Box sx={{ background: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton>
              <img src={AdharMasking} alt="Ticket Details" />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={600}>
              {"Basic Details"}
            </Typography>
          </Box>

          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
        <Divider />

        <Box sx={{ background: "#F5F6FB", borderRadius: 2, m: 1, p: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, fontSize: "0.9em" }}
            >
              {"Basic Details"}
            </Typography>
            <Typography variant="subtitle1" fontSize={"0.8em"}>
              {"Customer Name : Mohit Kawade"}
            </Typography>
            <Typography variant="subtitle1" fontSize={"0.8em"}>
              {"Account Number : ........9874"}
            </Typography>
            <Typography variant="subtitle1" fontSize={"0.8em"}>
              {"Date of Borth : 24 Jun 1982"}
            </Typography>
            <Typography variant="subtitle1" fontSize={"0.8em"}>
              {"Mother's Maiden Name : Sarita"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ background: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <img
                src={TicketIcon}
                alt="Ticket History"
                style={{ height: "1.7rem", width: "1.7rem" }}
              />
            </IconButton>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
            >
              {"Ticketing History"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <SearchOutlinedIcon sx={{ height: "1.3rem", width: "1.3rem" }} />
            </IconButton>
            <IconButton>
              <FilterAltOutlinedIcon
                sx={{ height: "1.3rem", width: "1.3rem" }}
              />
            </IconButton>
          </Box>
        </Box>
        <Divider />

        {ticketHistoryObj.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{ background: "#F5F6FB", borderRadius: 2, m: 1, p: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    color={"#0096C5"}
                    fontSize={"0.85rem"}
                  >
                    {item.ticketNo}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "flex",
                      fontWeight: 600,
                      color: "#FAAA49",
                      background: "#FEF3D6",
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      width: "5rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.date}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    background: "#EBF9EF",
                    color: "#00875F",
                    borderRadius: 2,
                    width: "4rem",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {item.status}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 1,
                  fontSize: "0.7rem",
                }}
              >
                <div className="flex gap-1">
                  <Typography fontSize="0.85rem" fontWeight={"bold"}>
                    {"Category:"}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="13px"
                    fontWeight={500}
                  >
                    {item.category}
                  </Typography>
                </div>

                <Typography
                  variant="caption"
                  fontSize="13px"
                  color="#0096C5"
                  sx={{ background: "#fff", borderRadius: 2, pl: 1, m: 0.3 }}
                >
                  {`Expected Resolution - ${item.expectedResoulution} `}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ background: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            p: 1,
            background: "#fff",
          }}
        >
          <RestoreOutlinedIcon />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
          >
            {"Cust Conversation History"}
          </Typography>
          <SearchOutlinedIcon />
        </Box>
        <Divider />

        <Box sx={{ background: "#F5F6FB", borderRadius: 2, m: 1, p: 1 }}>
          <Typography
            sx={{
              color: "#FAB45D",
              background: "#FEF3D6",
              maxWidth: "8rem",
              fontSize: "0.8rem",
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
              pl: 1,
            }}
          >
            {"20 Nov 23 | 11:00 am "}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", p: 0.3 }}>
            <span style={{ fontWeight: "bold" }}>{"Category:"}</span>{" "}
            {"Transaction Enquiry"}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", padding: 0.3 }}>
            <span style={{ fontWeight: "bold" }}>{"Agent:"}</span>{" "}
            <span
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                color: "#0096C5",
                fontSize: "0.85rem",
              }}
            >
              {"Nikhil Bhatt"}
            </span>
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                background: "#9AD5E8",
                height: "1.5rem",
                width: "100%",
                fontSize: "0.8rem",
              }}
            >
              {"Summary"}
            </Button>
            <Button
              sx={{
                background: "#fff",
                height: "1.5rem",
                width: "100%",
                color: "#757982",
                fontSize: "0.8rem",
              }}
            >
              {"Transcript"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivitySidebar;

export const ticketHistoryObj = [
  {
    id: 1,
    ticketNo: "#2874654",
    date: "20 Nov 2023",
    status: "Open",
    category: "Transaction Enquiry",
    expectedResoulution: "24 Nov 23|11:00 am",
  },
  {
    id: 2,
    ticketNo: "#2874654",
    date: "20 Nov 2023",
    status: "Open",
    category: "Transaction Enquiry",
    expectedResoulution: "24 Nov 23|11:00 am",
  },
  {
    id: 3,
    ticketNo: "#2874654",
    date: "20 Nov 2023",
    status: "Open",
    category: "Transaction Enquiry",
    expectedResoulution: "24 Nov 23|11:00 am",
  },
];
