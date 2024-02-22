import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { styled } from "@mui/material/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";

type Props = {};

const BulkUpload = (props: Props) => {
  const [value, setValue] = React.useState("Update");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box sx={{ background: "#fff" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, p: 1 }}>
        {"BULK TICKET MANAGER LIGHT"}
      </Typography>
      <Box
        sx={{
          background: "#fff",
          border: "1px solid #DADDDE",
          borderBottom: "3px solid #DADDDE ",
          borderRadius: 1.3,
          m: 2,
        }}
      >
        <Box sx={{ height: "8.5rem", p: 2 }}>
          <Typography variant="subtitle1">{"Select Action"}</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                sx={{ fontSize: "1.2rem" }}
                value="Update"
                control={<Radio />}
                label="Update"
              />
              <FormControlLabel
                sx={{ fontSize: "0.2rem" }}
                value="Delete"
                control={<Radio />}
                label="Delete"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          border: "1px solid #DADDDE ",
          p: 1,
          m: 2,
          borderRadius: 1,
          borderBottom: "3px solid #DADDDE ",
        }}
      >
        <Typography variant="subtitle1">{"Select File"}</Typography>
        <Box
          sx={{
            border: "3px solid #0096C5",
            height: "8rem",
            background: "#E6F5FA",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: "1rem",
            borderRadius: 1,
          }}
        >
          <BackupOutlinedIcon sx={{ color: "#0096C5" }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {"DRAG OR DROP FILES, OR"}{" "}
            <span>
              <Button
                sx={{ color: "#0096C5", fontWeight: "bold" }}
                component="label"
              >
                {"BROWSE"}
                <VisuallyHiddenInput type="file" />
              </Button>
            </span>
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#5C747B" }}>
            {"Supports.xlx,.xlsx,csv"}
          </Typography>
        </Box>
        <Box sx={{ pt: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#5C747B", fontWeight: 600, pb: 1 }}
          >
            {"DOCUMENTS"}
          </Typography>
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" sx={{ pt: 1 }}>
              {"273486565784.csv"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                pt: 1,
              }}
            >
              <Button
                sx={{
                  color: "#0096C5",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "none",
                }}
                variant="outlined"
                startIcon={<GetAppOutlinedIcon />}
              >
                {"Download"}
              </Button>

              <Button
                sx={{ color: "#E84F38", fontWeight: 600, border: "none" }}
                variant="outlined"
                startIcon={<DeleteOutlinedIcon />}
              >
                {"Delete"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BulkUpload;
