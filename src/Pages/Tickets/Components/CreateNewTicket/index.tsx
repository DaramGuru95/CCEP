import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

import {
  productObj,
  subProductObj,
  categoryObj,
  subCategoryObj,
  assignedToObj,
  priorityObj,
  subjectObj,
  statusObj,
} from "./createTicketData";
import { useEffect, useState } from "react";
import {
  TicketState,
  postTicketDetailsAction,
} from "../../../../Config/Store/Slices/reducers/ticket_reducers/createTicket_reducer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../Config/Store";
import getMasterDataService from "../../../../Config/Store/Slices/services/masterData/getMasterData";
import getActiveAgentService from "../../../../Config/Store/Slices/services/masterData/getActiveAgent";
import { useSelector } from "react-redux";
import getCustomer360 from "../../../../Config/Store/Slices/services/customer360_services/customer360_services";
import { getLocalStorage } from "../../../../Helpers/commonHelper";
import customer360Action from "../../../../Config/Store/Slices/actions/agent_console_action/customer_360_action";
import { tatData } from "../DetailedTicketPage/DetailedTicketForm";

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

export const fetchData = async () => {
  try {
    const reasonData = await getMasterDataService({
      data_type: "INTENT",
      data_sub_type: "DEFAULT",
    });

    const productData = await getMasterDataService({
      data_type: "PRODUCT",
      data_sub_type: "DEFAULT",
    });

    const categoryData = await getMasterDataService({
      data_type: "CATEGORY",
      data_sub_type: "DEFAULT",
    });

    const activeAgent = await getActiveAgentService();

    return {
      reasonData,
      productData,
      categoryData,
      activeAgent,
      loading: true,
    };
  } catch (error) {
    throw new Error("Error Loading Data");
  }
};

const CreateNewTicket: React.FC = () => {
  const [newTicket, setNewTicket] = useState<any>({
    product: "",
    sub_product: "",
    category: "",
    sub_category: "",
    assign: "",
    priority: "",
    subject: "",
    status: "Open",
    description: "",
    alt_ctct_number: "",
    alt_email: "",
    tat: "",
    channel: "",
    pdf: "",
  });

  console.log(newTicket, "newTicket");

  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [reasonDropDown, setReasonDropDown] = useState<any>([]);
  const [productDropDown, setProductDropDown] = useState<any>([]);
  const [categoryDropDown, setCategoryDropDown] = useState<any>([]);
  const [subCategoryDropDown, setSubCategoryDropDown] = useState<any>([]);
  const [subProductDropDown, setSubProductDropDown] = useState<any>([]);
  const [activeAgentOptions, setActiveAgentOptions] = useState<any>([]);
  const [status, setStatus] = useState<any>([]);

  useEffect(() => {
    // if (!data) {
    //   const conv_session_id = getLocalStorage("conv_session_id");
    //   dispatch(customer360Action(conv_session_id));
    // }
    // if (data) {
    //   setNewTicket((prevData: any) => ({
    //     ...prevData,
    //     alt_email: data?.email,
    //     alt_ctct_number: data?.phone_no,
    //   }));
    // }
  }, [data, dispatch]);

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

    if (event.target.name === "product") {
      const subProductData = await getMasterDataService({
        data_type: value.code,
        data_sub_type: "DEFAULT",
      });
      setSubProductDropDown(subProductData.code_values);
    }

    if (event.target.name === "category") {
      const subCategory = await getMasterDataService({
        data_type: value.code,
        data_sub_type: "DEFAULT",
      });
      setSubCategoryDropDown(subCategory.code_values);
    }
  };

  useEffect(() => {
    console.log("POSTTICKET");
    dispatch(postTicketDetailsAction(newTicket));
  }, [dispatch, newTicket]);

  useEffect(() => {
    fetchData().then((response) => {
      console.log(response);
      const { reasonData, productData, categoryData, activeAgent, loading } =
        response;
      setCategoryDropDown(categoryData.code_values);
      setReasonDropDown(reasonData.code_values);
      setProductDropDown(productData.code_values);
      setActiveAgentOptions(activeAgent.emp_data);
      setLoading(loading);
    });
  }, []);

  console.log(newTicket, "SubProduct");

  return (
    <Box sx={{ background: "#fff", p: 1 }}>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ color: "#79898d", fontWeight: 600, fontSize: "1rem", pb: 1 }}
        >
          {"Ticket details"}
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel sx={{ fontSize: "0.9rem" }} id="status-select-label">
              Product
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="status-select-label"
                value={newTicket.product}
                onChange={handleChange}
                name={"product"}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
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
                {productDropDown.map((option: any) => (
                  <MenuItem
                    sx={{ fontSize: "0.9em" }}
                    key={option.id}
                    value={option}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem" }}
              id="subCategory-select-label"
            >
              Sub-Product
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="subCategory-select-label"
                value={newTicket?.sub_product}
                onChange={handleChange}
                name={"sub_product"}
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
                {subProductDropDown?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem" }}
              id="subCategory-select-label"
            >
              Category
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="subCategory-select-label"
                value={newTicket.category}
                onChange={handleChange}
                name={"category"}
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
                {categoryDropDown?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem" }}
              id="subCategory-select-label"
            >
              Sub-Category
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="subCategory-select-label"
                value={newTicket.sub_category}
                onChange={handleChange}
                name={"sub_category"}
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
                {subCategoryDropDown?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel sx={{ fontSize: "0.9rem" }} id="Assigned-select-label">
              Assigned To
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="Assigned-select-label"
                value={newTicket?.assign}
                onChange={handleChange}
                name={"assign"}
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
                {activeAgentOptions?.map((option: any) => (
                  <MenuItem key={option.id} value={option}>
                    {option.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel
              sx={{ fontSize: "0.9rem" }}
              id="resolutionDate-select-label"
            >
              priority
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 29 }}
                displayEmpty
                labelId="resolutionDate-select-label"
                value={newTicket.priority}
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

          <Grid item md={6} sx={{ padding: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.9rem" }}
            >
              {"Subject"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              sx={{ height: 29, fontSize: "0.9rem" }}
              onChange={handleChange}
              name={"subject"}
              id="Subject"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Type Here"
            />
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel sx={{ fontSize: "0.9rem" }} id="Assigned-select-label">
              Status
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 26 }}
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
                disabled={true}
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
        </Grid>

        <Typography variant="subtitle2" sx={{ color: "#79898d" }}>
          {"Description"}
        </Typography>
        <OutlinedInput
          onChange={handleChange}
          name={"description"}
          id="Description"
          fullWidth
          multiline
          rows={2}
          endAdornment={<InputAdornment position="end"></InputAdornment>}
          placeholder="Please describe the issue"
          sx={{ marginBottom: 2 }}
        />
        <Grid container spacing={1}>
          <Grid item md={6} sx={{ padding: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.9rem" }}
            >
              {"Alternate Contact Number"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              value={newTicket.alt_ctct_number || data?.phone_no}
              sx={{ height: 29, fontSize: "0.9rem" }}
              onChange={handleChange}
              name={"alt_ctct_number"}
              id="Alternate Contact Number"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Enter Here"
            />
          </Grid>

          <Grid item md={6} sx={{ padding: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.9rem" }}
            >
              {"Email Id"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              value={newTicket?.alt_email || data?.email}
              sx={{ height: 29, fontSize: "0.9rem" }}
              onChange={handleChange}
              name={"alt_email"}
              id="Email Id"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Enter Here"
            />
          </Grid>

          {/* <Grid item md={6} sx={{ padding: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.9rem" }}
            >
              {"TAT"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              sx={{ height: 29, background: "#F0F2F2" }}
              onChange={handleChange}
              name={"tat"}
              id="tat"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
            />
          </Grid> */}

          <Grid item md={6} sx={{ padding: 1 }}>
            <InputLabel sx={{ fontSize: "0.9rem" }} id="Assigned-select-label">
              TAT
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 26, background: "#F0F2F2" }}
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

          <Grid item md={6} sx={{ padding: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#79898d", fontSize: "0.9rem" }}
            >
              {"Channel"}
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              value={newTicket.channel || "WEB"}
              sx={{ height: 29, background: "#F0F2F2" }}
              onChange={handleChange}
              name={"channel"}
              id="Channel"
              rows={2}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateNewTicket;
