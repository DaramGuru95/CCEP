import {
  Autocomplete,
  Box,
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
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import CheckList from "../../../../assets/images/CheckList.png";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
];

type Props = {};

const CloseTicket = (props: Props) => {
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

  const reasonOptions = [
    {
      id: 0,
      value: "Duplicate Tickets",
    },
    {
      id: 1,
      value: "Enquiry",
    },
    {
      id: 2,
      value: "Onboarding",
    },
    {
      id: 3,
      value: "Transactions",
    },
  ];

  const [mergingReason, setMergingReason] = useState<string>("");
  const createDateOnChange = (
    event: SelectChangeEvent<typeof mergingReason>
  ) => {
    setMergingReason(event.target.value);
  };

  return (
    <Box sx={{ background: "#fff", m: 1 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            sx={{ backgroundColor: "#f0f2f2" }}
            {...params}
            placeholder="Look for contact’s tickets"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <InputAdornment position="start" sx={{ color: "#000" }}>
                  <Box
                    sx={{
                      borderRight: 2,
                      borderColor: "divider",
                      padding: 1,
                      borderRadius: 1,
                      marginRight: 2,
                    }}
                  >
                    Contact <ArrowDropDownIcon />{" "}
                  </Box>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Box sx={{ m: 1 }}>
        <Grid item md={3}>
          <InputLabel id="status-select-label">
            {"Reason for merging"}
          </InputLabel>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              labelId="status-select-label"
              value={mergingReason}
              onChange={createDateOnChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography>{"Duplicate Tickets"}</Typography>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {reasonOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Box>

      <Box>
        <TicketCard />
      </Box>
    </Box>
  );
};

export default CloseTicket;

const TicketCardObj = [
  {
    id: 1,
    closeIcon: <DoNotDisturbOnOutlinedIcon />,
    ticketId: "14325",
    description: "Unable to do cash withdrawl | withdrawl",
    group: "Customer Support",
    agent: "Ramesh Gupta",
    createdTime: "02 minutes ago",
    firstResponse: "11 hours",
    ticketStatusIcon: { CheckList },
    ticketStatus: "Primary",
  },
  {
    id: 2,
    closeIcon: <DoNotDisturbOnOutlinedIcon />,
    ticketId: "14325",
    description: "Transaction Details | withdrawl",
    group: "Customer Support",
    agent: "Shalini Jain",
    createdTime: "05 minutes ago",
    firstResponse: "11 hours",
    ticketStatusIcon: { CheckList },
    ticketStatus: "Child",
  },
];

function TicketCard() {
  return (
    <Box>
      {TicketCardObj.map((item) => (
        <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
            border: "1px solid #AFB8BA",
            borderRadius: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {<DoNotDisturbOnOutlinedIcon sx={{ color: "#E22853" }} />}
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#AFB8BA" }}>
              {item.ticketId}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#0096C5" }}>
              {item.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#AFB8BA" }}>
              <span style={{ fontWeight: "bold" }}>{"Group: "}</span>
              {item.group}
              <span style={{ fontWeight: "bold" }}>{".Agent: "}</span>
              {item.agent}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#AFB8BA" }}>
              <span style={{ fontWeight: "bold" }}>{"Created: "}</span>
              {item.createdTime}
              <span style={{ fontWeight: "bold" }}>
                {". First Response due in: "}
              </span>
              {item.firstResponse}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={CheckList} alt="checklist" />
            <Typography sx={{ color: "#AFB8BA" }} variant="subtitle2">
              {item.ticketStatus}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
