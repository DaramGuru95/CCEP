import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormFilter from "./FormFilter";

type Props = {};

const ExportTickets = (props: Props) => {
  return (
    <Box
      width={"100%"}
      sx={{
        background: "#fff",
        borderRadius: 2,
      }}
    >
      <Box sx={{ paddingLeft: 1 }}>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{
              fontWeight: 600,
              color: "#b3bcbe",
              marginBottom: 1,
              marginTop: 1,
              fontSize: "12px",
            }}
          >
            EXPORT AS
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
                marginBottom: 1,
              }}
            >
              <FormControlLabel value="csv" control={<Radio />} label="CSV" />
              <FormControlLabel
                value="excel"
                control={<Radio />}
                label="EXCEL"
              />
            </Box>
          </RadioGroup>
          {/* <Box sx={{ display: "flex" }}>
            <input value={"csv"} type="radio" id="csv" />
            <label for="csv">CSV</label>
            <input value={"excel"} type="radio" />
            <Typography>EXCEL</Typography>
          </Box> */}
        </FormControl>
      </Box>

      <Divider sx={{ background: "#b3bcbe" }} />

      <Box
        sx={{
          marginBottom: 1,
          marginTop: 1.5,
          paddingLeft: 1,
          height: "20vh",
        }}
      >
        <Typography fontWeight={600} color={"#b3bcbe"}>
          Filter Tickets
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 1 }}>
          <FormFilter />
        </Box>
      </Box>

      <Divider sx={{ background: "#b3bcbe" }} />

      <Box
        sx={{
          marginBottom: 2,
          marginTop: 1.5,
          paddingLeft: 2,
          height: "35vh",
        }}
      >
        <Typography fontWeight={600} color={"#b3bcbe"}>
          TICKET FIELDS
        </Typography>
        <Box sx={{ display: "flex", gap: 6 }}>
          <Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Ticket ID" />
              <FormControlLabel control={<Checkbox />} label="Status" />
              <FormControlLabel control={<Checkbox />} label="Subject" />
              <FormControlLabel control={<Checkbox />} label="Source" />
            </FormGroup>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Agent" />
              <FormControlLabel control={<Checkbox />} label="Type" />
              <FormControlLabel control={<Checkbox />} label="Group" />
              <FormControlLabel control={<Checkbox />} label="Priority" />
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExportTickets;
