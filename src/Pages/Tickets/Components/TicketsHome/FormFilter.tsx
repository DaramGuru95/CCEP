import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { createdTimeOptions, lastDaysOptions } from "./options";

type Props = {};

const FormFilter = (props: Props) => {
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

  const [createdTime, setcreatedTime] = React.useState<string>("");
  const [lastDays, setLastDays] = React.useState<string>("");

  const createdTimeOnChange = (
    event: SelectChangeEvent<typeof createdTime>
  ) => {
    setcreatedTime(event.target.value);
  };

  const lastDaysOnChange = (event: SelectChangeEvent<typeof lastDays>) => {
    setLastDays(event.target.value);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={4} sx={{ padding: 1, width: "234px", height: "22px" }}>
          <InputLabel id="status-select-label">Created Time</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              labelId="status-select-label"
              value={createdTime}
              onChange={createdTimeOnChange}
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
              {createdTimeOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4} sx={{ padding: 1, width: "234px", height: "32px" }}>
          <InputLabel id="status-select-label">Last 7 Days</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              labelId="status-select-label"
              value={lastDays}
              onChange={lastDaysOnChange}
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
              {lastDaysOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormFilter;
