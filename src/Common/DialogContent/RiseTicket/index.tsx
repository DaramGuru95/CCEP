import React from "react";
import { FormControl, MenuItem, Select, TextField, Box } from "@mui/material";

type Props = {};

const RiseTicket = (props: Props) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Product
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Sub-Product
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Category
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Sub-Category
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Assigned To
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Priority
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Subject
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Status
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <FormControl sx={{ m: 1 }} fullWidth size="small">
        <label htmlFor="" className="text-xs text-gray-500">
          Description
        </label>
        <TextField
          placeholder="Please describe the issue"
          multiline
          fullWidth
        />
      </FormControl>
      <div className="grid grid-cols-2 gap-2">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Alternate Contact Number
          </label>
          <TextField
            sx={{ ".MuiInputBase-input": { height: 10 } }}
            placeholder="Enter here"
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Email Id
          </label>
          <TextField
            sx={{ ".MuiInputBase-input": { height: 10 } }}
            placeholder="Enter here"
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            TAT
          </label>
          <TextField
            sx={{ ".MuiInputBase-input": { height: 10 } }}
            placeholder="Enter here"
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Channel
          </label>
          <TextField
            sx={{ ".MuiInputBase-input": { height: 10 } }}
            placeholder="Enter here"
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default RiseTicket;
