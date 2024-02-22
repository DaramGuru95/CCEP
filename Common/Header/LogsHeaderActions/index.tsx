import React from 'react'
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type Props = {}

const ViewLogsHeaderActions = (props: Props) => {
  return (
    <Box width={"25vw"}>
    <FormControl fullWidth variant="outlined" size='small'>
      <InputLabel htmlFor="outlined-adornment-password">
        Search Ticket
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Search Icon" edge="end">
                <SearchOutlinedIcon/>
            </IconButton>
          </InputAdornment>
        }
        label="Search Ticket"
      />
    </FormControl>
  </Box>
  )
}

export default ViewLogsHeaderActions