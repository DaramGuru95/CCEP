import React from "react";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

function MUISlider() {
  const [value, setValue] = React.useState(80);
  const backgroundThumb = () => {
    if (value <= 30) {
      return "#ff0000";
    } else if (value > 30 && value <= 60) {
      return "#ffff00";
    } else {
      return "#00ff00";
    }
  };
  const PrettoSlider = styled(Slider)({
    color: "#52af77",
    height: 3,
    padding: "2px 0",

    ".MuiSlider-rail": {
      background:
        "linear-gradient(to right, #ff0000 0%, #ffff00 50%, #00ff00 100%)",
      opacity: "1",
    },
    "& .MuiSlider-track": {
      border: "none",
      color: "transparent",
    },
    "& .MuiSlider-thumb": {
      height: 14,
      width: 14,
      backgroundColor: backgroundThumb(),
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 2,
      color: "black",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "& > *": {
        transform: "rotate(0deg)",
      },
    },
  });

  return (
    <div>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={value}
        disabled
      />
      <div className="flex justify-between text-xs">
        <span>Bad</span>
        <span>Neutral</span>
        <span>Good</span>
      </div>
    </div>
  );
}

export default MUISlider;
