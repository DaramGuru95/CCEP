import {
  Box,
  Checkbox,
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

const Reply = (props: Props) => {
  const [reply, setReply] = React.useState<string>("");
  const replyOnChange = (event: SelectChangeEvent<typeof reply>) => {
    setReply(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ background: "#fff", borderRadius: 1 }}>
      <Grid container spacing={1} padding={1}>
        <Grid item md={3} sx={{ padding: 1 }}>
          <InputLabel id="status-select-label">Subject</InputLabel>
          <FormControl fullWidth size="small">
            <Select
              sx={{ height: 30, width: "15rem" }}
              displayEmpty
              labelId="status-select-label"
              value={reply}
              onChange={replyOnChange}
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

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="subtitle1" sx={{ color: "#b3bcbe" }}>
          {"Add secondary ticket recipients to CC"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Reply;
