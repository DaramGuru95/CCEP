// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CustomTooltip = ({ slice }) => {
  // Customize the tooltip content based on the data point
  //   const customValue = point.data.yStacked;
  console.log(slice, "point");

  return (
    <div>
      <Paper
        sx={{
          padding: 1,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: -10,
            right: 35,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
      >
        <Box
          display={"flex"}
          width={slice.points.length + 50}
          marginX={1}
          padding={0.5}
          justifyContent={"center"}
        >
          {slice.points.map((item, index) => (
            <>
              {index !== 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "#000", marginY: 0.5 }}
                />
              )}
              <Typography
                sx={{ color: item.serieColor, paddingX: 1, fontWeight: "bold" }}
              >
                {item.data.y}
              </Typography>
              {index < slice.points.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "#000", marginY: 0.5 }}
                />
              )}
            </>
          ))}
        </Box>
      </Paper>
    </div>
  );
};

const CustomSymbolShape = ({ x, y, size, fill, borderWidth, borderColor }) => (
  <rect
    x={x}
    y={y}
    rx={2}
    ry={2}
    // transform={`rotate(45 ${size/2} ${size/2})`}
    fill={fill}
    strokeWidth={borderWidth}
    stroke={borderColor}
    width={20}
    height={3}
    style={{ pointerEvents: "none" }}
  />
);
const ConversationByChannelChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    theme={{
      grid: {
        line: {
          stroke: "#dddddd",
          strokeWidth: 1,
          strokeDasharray: "5, 5",
        },
      },
      legends: {
        title: {
          text: {
            fontSize: 11,
            fill: "#333333",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
        },
        text: {
          fontSize: 8,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
        ticks: {
          line: {
            fill: "red",
          },
          text: {
            fontSize: 8,
            fill: "#333333",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
        },
      },
      axis: {
        domain: {
          line: {
            strokeWidth: 1,
          },
        },
        legend: {
          text: {
            fontSize: 12,
            fill: "#333333",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
        },
        ticks: {
          line: {
            stroke: "hsla(216, 7%, 87%, 1)",
            strokeWidth: 1,
            outlineColor: "transparent",
          },
          text: {
            fontSize: 8,
            fontWeight: "bold",
            fill: "hsla(210, 6%, 34%, 1)",
            outlineWidth: 0,
            outlineColor: "transparent",
            paddingRight: 1,
          },
        },
      },
    }}
    colors={["hsla(38, 100%, 50%, 1)", "hsla(178, 61%, 44%, 1)"]}
    margin={{ top: 40, right: 25, bottom: 50, left: 25 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 0,
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    enableSlices="x"
    yFormat=" "
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    sliceTooltip={CustomTooltip}
    crosshairType="x"
    enableGridX={false}
    lineWidth={3}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "top-left",
        direction: "row",
        justify: false,
        translateX: -14,
        translateY: -33,
        itemWidth: 40,
        itemHeight: 10,
        itemsSpacing: 20,
        symbolSize: 5,
        symbolSpacing:20,
        symbolShape: CustomSymbolShape,
        itemDirection: "left-to-right",
        itemTextColor: "#777",

        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default ConversationByChannelChart;
