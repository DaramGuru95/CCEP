import React from "react";
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Add, CallEnd, Pause } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { getLocalStorage } from "../../Helpers/commonHelper";
import { useSelector } from "react-redux";
import { RootState } from "../../Config/Store";
import { Customer360Modal } from "../../Config/Store/Slices/reducers/agentconsole_reducers/customer360_reducers";

interface ContactCardProps {
  name: string;
  imageUrl: string;
  handleClickOpen: any;
  item: any;
  totalTime?: any;
}

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  imageUrl,
  handleClickOpen,
  item,
  totalTime,
}) => {
  const { state } = useLocation();
  const getStoreType = getLocalStorage("agent_page");
  const getStoreStatus = getLocalStorage("agent_page_status");
  const customerData = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );
  const customer360: Customer360Modal | null = customerData.data;

  return (
    <div className="flex flex-col  mb-4 border pb-2">
      <ListItem alignItems="center">
        {/* Image and Name */}
        <ListItemAvatar className="mr-1 ">
          <img src={imageUrl} alt="" className="h-20 w-16 " />
          {/* <Avatar variant="square" alt={name} src={imageUrl} /> */}
        </ListItemAvatar>

        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component="p" variant="body2" color="text.primary">
                <span className="text-xs font-bold">
                  {state?.type == "CALL" || getStoreType == `"CALL"`
                    ? "Call "
                    : "Conversation "}
                  Duration:{" "}
                </span>
                <span>{totalTime}</span>
              </Typography>
              <Typography component="p" variant="body2" color="text.primary">
                <span className="text-xs font-bold">Customer: </span>
                <span>{name}</span>
              </Typography>
              <Typography component="p" variant="body2" color="text.primary">
                <span className="text-xs font-bold">Customer ID: </span>
                <span>{customer360?.customer_id}</span>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {(state?.type == "CALL" || getStoreType == `"CALL"`) &&
        getStoreStatus == `"ACTIVE"` && <Divider className="" />}
      {(state?.type == "CALL" || getStoreType == `"CALL"`) &&
        getStoreStatus == `"ACTIVE"` && (
          <Stack
            direction="row"
            spacing={2}
            className="mx-2 mt-2"
            alignItems="center"
          >
            <Button
              sx={{
                fontSize: 8,
                background: "#f0f2f2",
                borderRadius: "0px",
                color: "black",
                "&:hover": { backgroundColor: "#f0f2f2" },
                ".MuiSvgIcon-root": {
                  fontSize: 12,
                },
              }}
              startIcon={<Pause className="fs-8" />}
            >
              Hold
            </Button>
            <Button
              sx={{
                fontSize: 8,
                background: "red",
                borderRadius: "0px",
                color: "white",
                "&:hover": { backgroundColor: "red" },
                ".MuiSvgIcon-root": {
                  fontSize: 12,
                },
              }}
              startIcon={<CallEnd className="fs-8" />}
            >
              End
            </Button>
            <Button
              className="text-pretty"
              sx={{
                fontSize: 8,
                background: "#f0f2f2",
                borderRadius: "0px",
                color: "black",
                "&:hover": { backgroundColor: "#f0f2f2" },
                ".MuiSvgIcon-root": {
                  fontSize: 12,
                },
              }}
              startIcon={<Add className="fs-8" />}
              onClick={(e) => handleClickOpen(e, item)}
            >
              <span className="whitespace-pre">Add Conference</span>
            </Button>
          </Stack>
        )}
    </div>
  );
};

export default ContactCard;
