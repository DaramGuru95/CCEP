import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { detailedCategoryOptions } from "./detailedOptionsData";
import { fetchData } from "../CreateNewTicket";
import getMasterDataService from "../../../../Config/Store/Slices/services/masterData/getMasterData";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Config/Store";
import { ticketDetails } from "../TicketsHome/TicketDetailsObj";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../../Helpers/commonHelper";
import customer360Action from "../../../../Config/Store/Slices/actions/agent_console_action/customer_360_action";
import { priorityObj, statusObj } from "../CreateNewTicket/createTicketData";

export const tatData = [
  {
    id: 0,
    code: "24 hrs",
    value: "24 Hours",
  },
  {
    id: 1,
    code: "48 hrs",
    value: "48 Hours",
  },
];

type Props = {};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 100,
    },
  },
};

const DetailedTicketForm = (props: Props) => {
  // const [loading, setLoading] = useState<boolean>(true);
  const { currentTicketDetails = "" } = useSelector(
    (state: RootState) => state.selectedTicketDetails
  );

  const [categoryDropDown, setCategoryDropDown] = useState<any>([]);
  const [subCategoryDropDown, setSubCategoryDropDown] = useState<any>([]);
  const [activeAgentOptions, setActiveAgentOptions] = useState<any>([]);
  const [expectedResolutionDate, setExpectedResolutiuondate] =
    useState<any>("");

  const dispatch: AppDispatch = useDispatch();
  const { profile_details } = useSelector(
    (state: RootState) => state.userDetails.userDetails
  );

  useEffect(() => {
    const conv_session_id = getLocalStorage("conv_session_id");
    dispatch(customer360Action(conv_session_id));
  }, [dispatch]);

  useEffect(() => {
    fetchData().then((response) => {
      const { categoryData, activeAgent } = response;
      setCategoryDropDown(categoryData.code_values);
      setActiveAgentOptions(activeAgent.emp_data);
    });
  }, []);

  const [newTicket, setNewTicket] = useState<any>({
    category: "",
    sub_category: "",
    product: "",
    sub_product: "",
    assign: "",
    priority: "",
    subject: "",
    status: "",
    description: "",
    alt_ctct_number: "",
    alt_email: "",
    tat: "",
    channel: "",
    created_on: "",
  });

  useEffect(() => {
    if (currentTicketDetails) {
      setNewTicket((prevState: any) => ({
        ...prevState,
        ...currentTicketDetails,
      }));
    }
  }, [currentTicketDetails]);

  const handleChange = async (event: any) => {
    const { value } = event.target;
    if (
      ["description", "subject", "alt_email", "alt_ctct_number"].includes(
        event.target.name
      )
    ) {
      setNewTicket((prevValue: any) => ({
        ...prevValue,
        [event.target.name]: value,
      }));
    } else {
      setNewTicket((prevState: any) => ({
        ...prevState,
        ...(event.target.name === "assign"
          ? { [event.target.name]: value?.full_name as string }
          : { [event.target.name]: value?.value as string }),
      }));
    }

    if (event.target.name === "category") {
      const subCategory = await getMasterDataService({
        data_type: value?.code,
        data_sub_type: "DEFAULT",
      });
      setSubCategoryDropDown(subCategory.code_values);
    }
  };

  const handleExpectedDateChange = (event: any) => {
    setNewTicket((prev: any) => ({
      ...prev,
      expected_solution_date: dayjs(event).format("YYYY-MM-DD HH:mm"),
    }));
  };

  useEffect(() => {
    if (newTicket && newTicket.tat === "24 Hours") {
      setExpectedResolutiuondate(dayjs(newTicket.created_on).add(1, "days"));
    } else if (newTicket && newTicket.tat === "48 Hours") {
      setExpectedResolutiuondate(dayjs(newTicket.created_on).add(2, "days"));
    }
  }, [newTicket, newTicket.tat]);

  return (
    <Box>
      <Box
        sx={{
          ".MuiInputLabel-root": {
            fontSize: "small",
          },
        }}
      >
        <Grid container spacing={1} padding={1}>
          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="status-select-label" sx={{ fontSize: "0.8rem" }}>
              Category
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28, fontSize: "1rem" }}
                displayEmpty
                labelId="status-select-label"
                value={newTicket?.category || ""}
                onChange={handleChange}
                name={"category"}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {categoryDropDown?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel
              id="subCategory-select-label"
              sx={{ fontSize: "0.8rem" }}
            >
              Sub-Category
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28 }}
                displayEmpty
                labelId="subCategory-select-label"
                value={newTicket?.sub_category || ""}
                onChange={handleChange}
                name={"sub_category"}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {subCategoryDropDown?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="Assigned-select-label" sx={{ fontSize: "0.8rem" }}>
              Assigned To
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28 }}
                displayEmpty
                labelId="Assigned-select-label"
                value={newTicket?.assign || ""}
                onChange={handleChange}
                name={"assign"}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {activeAgentOptions?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel
              id="Expected Resolution Date"
              sx={{ fontSize: "0.8rem" }}
            >
              Expected Resolution Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                className="date-picker"
                value={expectedResolutionDate}
                onChange={(newvalue) => handleExpectedDateChange(newvalue)}
                format="DD-MM-YYYY"
                name="created_on"
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="Closure Date" sx={{ fontSize: "0.8rem" }}>
              Closure Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                className="date-picker"
                value={dayjs(newTicket?.created_on)}
                format="DD-MM-YYYY"
                name="created_on"
                onChange={(newvalue) => handleExpectedDateChange(newvalue)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="tat-select-label" sx={{ fontSize: "0.8rem" }}>
              TAT
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28, fontSize: "0.9rem" }}
                displayEmpty
                labelId="tat-select-label"
                value={newTicket?.tat || ""}
                onChange={handleChange}
                name="tat"
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {tatData?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="assignee-select-label" sx={{ fontSize: "0.8rem" }}>
              Assignee
            </InputLabel>
            <OutlinedInput
              value={`${profile_details?.first_name}  ${profile_details?.last_name}`}
              size="small"
              sx={{ height: 28, fontSize: "0.9rem" }}
            />
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <Typography variant="subtitle2" sx={{ fontSize: "0.8rem" }}>
              {"Channel"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              value={newTicket?.channel || "WEB"}
              sx={{ height: 28, fontSize: "0.8rem" }}
              onChange={handleChange}
              name={"channel"}
              id="Channel"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
            />
          </Grid>

          {/* <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel id="Last Updated" sx={{ fontSize: "0.8rem" }}>
              Last Updated
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                className="date-picker"
              />
            </LocalizationProvider>
          </Grid> */}

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem" }}
              id="resolutionDate-select-label"
            >
              Priority
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28 }}
                displayEmpty
                labelId="resolutionDate-select-label"
                value={newTicket?.priority}
                onChange={handleChange}
                name={"priority"}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe", fontSize: "0.9rem" }}>
                        Select
                      </Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {priorityObj?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ paddingBottom: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.8rem" }}
            >
              {"Mobile Number"}
            </Typography>
            <OutlinedInput
              size="small"
              sx={{ height: 28, fontSize: "0.9rem" }}
              onChange={handleChange}
              value={newTicket?.alt_ctct_number}
              name={"alt_ctct_number"}
              id="outlined-multiline-static"
              // rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Type Here"
            />
          </Grid>

          {/* <Grid item md={3} sx={{ paddingBottom: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.8rem" }}
            >
              {"Email Id"}
            </Typography>
            <OutlinedInput
              size="small"
              sx={{ height: 28, fontSize: "1rem" }}
              onChange={handleChange}
              value={newTicket?.alt_email}
              name={"alt_email"}
              id="outlined-multiline-static"
              // rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Type Here"
            />
          </Grid> */}

          <Grid item md={3} sx={{ padding: 1.5 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem", pb: 0.2 }}
              id="Assigned-select-label"
            >
              Status
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28, fontSize: "0.8rem" }}
                displayEmpty
                labelId="tat-select-label"
                value={newTicket?.status || ""}
                onChange={handleChange}
                name="status"
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {statusObj?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} sx={{ padding: 1 }}>
            <InputLabel
              id="status-select-label"
              sx={{ fontSize: "0.8rem", pb: 0.2 }}
            >
              Tags
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 28, fontSize: "1rem" }}
                displayEmpty
                labelId="status-select-label"
                value={newTicket?.tags || ""}
                onChange={handleChange}
                name="tags"
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {detailedCategoryOptions?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider />
      </Box>
    </Box>
  );
};

export default DetailedTicketForm;
