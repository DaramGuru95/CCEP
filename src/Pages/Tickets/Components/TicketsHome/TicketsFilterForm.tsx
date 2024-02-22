import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Grid, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/material";
import {
  statusOptions,
  createDateOptions,
  priorityOptions,
  category1Options,
  channelOptions,
  categoryOptions,
  categorySubCategoryOptions,
} from "./options";

export default function TicketsFilterForm() {
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

  const [status, setStatus] = React.useState<string>("");
  const [createDate, setCreateDate] = React.useState<string>("");
  const [priority, setPriority] = React.useState<string>("");
  const [category, setcategory] = React.useState<string>("");
  const [channel, setchannel] = React.useState<string>("");
  const [categorySubCategory, setCategorySubCategory] =
    React.useState<string>("");

  const statusOnChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value);
  };

  const createDateOnChange = (event: SelectChangeEvent<typeof createDate>) => {
    setCreateDate(event.target.value);
  };

  const priorityOnChange = (event: SelectChangeEvent<typeof priority>) => {
    setPriority(event.target.value);
  };

  const categoryOnChange = (event: SelectChangeEvent<typeof category>) => {
    setcategory(event.target.value);
  };

  const channelyOnChange = (event: SelectChangeEvent<typeof channel>) => {
    setchannel(event.target.value);
  };

  const subCategoryOnChange = (
    event: SelectChangeEvent<typeof categorySubCategory>
  ) => {
    setCategorySubCategory(event.target.value);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30 }}
              displayEmpty
              labelId="status-select-label"
              value={status}
              onChange={statusOnChange}
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
              {statusOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <InputLabel id="status-select-label">Create Date</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30 }}
              displayEmpty
              labelId="status-select-label"
              value={createDate}
              onChange={createDateOnChange}
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
              {createDateOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Priority</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={priority}
                onChange={priorityOnChange}
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
                {priorityOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Groups</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={category}
                onChange={categoryOnChange}
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
                {category1Options.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Source</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={category}
                onChange={categoryOnChange}
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
                {category1Options.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Category</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                // labelId="priority"
                value={category}
                onChange={categoryOnChange}
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
                {category1Options.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Sub Category</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={categorySubCategory}
                onChange={subCategoryOnChange}
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
                {categorySubCategoryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Tags</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={category}
                onChange={categoryOnChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography sx={{ color: "#b3bcbe" }}>Enter</Typography>
                    );
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <InputLabel id="priority">Agent</InputLabel>
            <FormControl fullWidth size="small">
              <Select
                sx={{ height: 30 }}
                displayEmpty
                labelId="priority"
                value={channel}
                onChange={channelyOnChange}
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
                {channelOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Box marginY={2}>
        <Button variant="contained" size="small" sx={{ paddingX: 2 }}>
          Search
        </Button>
      </Box>
    </Box>
  );
}
