import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Grid, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/material";
import {
  timeLineOptions,
  channelOptions,
} from "./Charts/ConversationByChannelChart/formOptions";

type Props = {};

const DashboardFilterForm = (props: Props) => {
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

  const [timeLine, setTimeLine] = React.useState<string>("");
  const [channel, setChannel] = React.useState<string>("");

  const timelineOnChange = (event: SelectChangeEvent<typeof timeLine>) => {
    setTimeLine(event.target.value);
  };

  const channelOnChange = (event: SelectChangeEvent<typeof channel>) => {
    setChannel(event.target.value);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Timeline</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              labelId="status-select-label"
              value={timeLine}
              onChange={timelineOnChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "divider" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {timeLineOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <InputLabel id="status-select-label">Channel</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              labelId="status-select-label"
              value={channel}
              onChange={channelOnChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography sx={{ color: "divider" }}>Select</Typography>
                  );
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {channelOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box marginY={2}>
        <Button variant="contained" size="small" sx={{ paddingX: 2 }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardFilterForm;
