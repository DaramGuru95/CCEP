import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TicketsFilterForm from "./TicketsFilterForm";
import { useState } from "react";
import AdvanceFilterLayout from "../../../../Common/AdvancedFilterHeader";
import CustomizedDialogs from "../../../../Common/DialogModal";
import ExportTickets from "./ExportTickets";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import CallMergeOutlinedIcon from "@mui/icons-material/CallMergeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined";
import MergeTicket from "../TicketActionButtons/MergeTicket";
import SpamTicket from "../TicketActionButtons/SpamTicket";
import CloseTicket from "../TicketActionButtons/CloseTicket";

const dialogContentItems = [
  {
    id: 0,
    text: "Export Tickets",
    dialogContent: <ExportTickets />,
    submitButtonText: "Export",
    buttonIcon: null,
    submitButtonFunction: () => console.log("Export Button Clicked"),
  },
  {
    id: 1,
    text: "Merge",
    dialogContent: <MergeTicket />,
    submitButtonText: "Merge",
    buttonIcon: <CallMergeOutlinedIcon />,
    submitButtonFunction: () => console.log("Export Button Clicked"),
  },
  {
    id: 2,
    text: "Close",
    dialogContent: <CloseTicket />,
    submitButtonText: "Close",
    buttonIcon: <CancelOutlinedIcon />,
    submitButtonFunction: () => console.log("Export Button Clicked"),
  },
  {
    id: 3,
    text: "Spam",
    dialogContent: <SpamTicket />,
    submitButtonText: "Spam",
    buttonIcon: <DoNotDisturbOutlinedIcon />,
    submitButtonFunction: () => console.log("Export Button Clicked"),
  },
];

interface TicketsHeaderProps {
  rowSelectionModel: GridRowSelectionModel;
}

const TicketsHeader: React.FC<TicketsHeaderProps> = ({ rowSelectionModel }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showHide, setShowHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any, item: {}) => {
    setDialogContent(item);
    setOpen(true);
  };

  return (
    <Box>
      <AdvanceFilterLayout showHide={showHide} setShowHide={setShowHide}>
        {showHide && <TicketsFilterForm />}
        <Box marginTop={2}>
          <Divider sx={{ background: "#b3bcbe" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "9vh",
              alignItems: "center",
            }}
          >
            {!rowSelectionModel.length ? (
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox {...label} />
                <Typography variant="subtitle1">
                  {"Sort By"} :{" "}
                  <span style={{ fontWeight: "bold" }}>{"Date Created"}</span>
                </Typography>

                <IconButton sx={{ gap: 10 }}>
                  <ArrowDropDownIcon sx={{ color: "#black" }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                {dialogContentItems
                  .slice(1, dialogContentItems.length)
                  .map((item) => (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={item.buttonIcon}
                      onClick={(e) => handleClickOpen(e, item)}
                      sx={{
                        backgroundColor: "#F0F2F2",
                        color: "#000",
                        borderColor: "#b3bcbe",
                        padding: "1.2em 1.3em",
                        border: "1.8px solid #b3bcbe",
                        fontSize: 10,
                        height: "1rem",
                        maxWidth: "100%",
                        borderRadius: 1,
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
              </Box>
            )}

            <Box>
              <Button
                size="small"
                onClick={(e) => handleClickOpen(e, dialogContentItems[0])}
                sx={{
                  border: "1.8px solid #b3bcbe",
                  fontSize: 10,
                  color: "#000",
                  height: "1.1rem",
                  maxWidth: "100%",
                  borderRadius: 1,
                  padding: "1.2em 1.1em",
                  textTransform: "none",
                }}
              >
                {"Export Tickets"}
              </Button>
            </Box>
          </Box>
        </Box>
      </AdvanceFilterLayout>

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

export default TicketsHeader;
