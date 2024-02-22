import React, { useState } from "react";

export const RangeSlider = () => {
  const [sliderValue, setSliderValue] = useState(10);

  const getGradientColor = (percentage: any) => {
    if (percentage <= 15) {
      return "#E84F38"; // Red color for the first 15%
    } else if (percentage <= 60) {
      return "#FFA000"; // Orange color for the next 45%
    } else {
      return "#51B82C"; // Green color for the remaining 40%
    }
  };

  const handleSliderChange = (event: any) => {
    setSliderValue(event.target.value);
  };

  const thumbColor = getGradientColor((sliderValue / 100) * 100);

  return (
    <div className="range-container">
      <input
        type="range"
        value={sliderValue}
        onChange={handleSliderChange}
        style={{
          background: `linear-gradient(to right, ${getGradientColor(
            0
          )} 0%, ${getGradientColor(15)} 15%, ${getGradientColor(
            60
          )} 60%, ${getGradientColor(100)} 100%)`,
        }}
        className="w-full h-1 mb-6 rounded-lg appearance-none cursor-pointer range-sm"
      />
      <div className="range-value fs-8">{sliderValue}</div>
    </div>
  );
};
