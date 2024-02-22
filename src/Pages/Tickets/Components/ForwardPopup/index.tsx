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
import { useState } from "react";

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

const replyObj = [
  {
    id: 0,
    value: "Duplicate Tickets",
  },
];

const TicketForward = (props: Props) => {
  const [ticketForward, setTicketForward] = useState({
    department: "",
    assigned: "",
    product: "",
    sub_product: "",
    category: "",
    sub_category: "",
  });

  const handleChange = (event: any) => {
    setTicketForward((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  return (
    <Box sx={{ background: "#fff", borderRadius: 1 }}>
      <Grid container spacing={1} padding={1}>
        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Department</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.department}
              onChange={handleChange}
              name={"department"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Assigned To</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.assigned}
              onChange={handleChange}
              name={"assigned"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Product</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.product}
              onChange={handleChange}
              name={"product"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Sub Product</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.sub_product}
              onChange={handleChange}
              name={"sub_product"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Category</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.category}
              onChange={handleChange}
              name={"category"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Sub Category</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={ticketForward.sub_category}
              onChange={handleChange}
              name={"sub_category"}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "#b3bcbe" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {replyObj.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" sx={{ color: "#79898d" }}>
        {"Remarks"}
      </Typography>
      <OutlinedInput
        onChange={handleChange}
        name={"description"}
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={2}
        endAdornment={<InputAdornment position="end"></InputAdornment>}
        placeholder="Please describe the issue"
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default TicketForward;
