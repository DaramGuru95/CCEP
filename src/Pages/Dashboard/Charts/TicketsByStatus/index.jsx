// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const CustomSymbolShape = ({ x, y, size, fill, borderWidth, borderColor }) => (
    <g transform={`translate(${x}, ${y})`} style={{ marginRight: 15,padding:5 }}>
  <rect
    x={x}
    y={y}
    rx={2}
    ry={2}
    fill={fill}
    strokeWidth={borderWidth}
    stroke={borderColor}
    width={5}
    height={25}
    style={{ pointerEvents: "none" }}
  />
  </g>
);


const TicketsByStatus = ({ data }) => (
    <ResponsivePie
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
        margin={{ top: 40, right: 120, bottom: 50, left: 0 }}
        valueFormat=" > #.2%"
        innerRadius={0.75}
        padAngle={11}
        cornerRadius={12}
        activeOuterRadiusOffset={8}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        colors={["hsla(8, 79%, 56%, 1)", "hsla(38, 100%, 50%, 1)","hsla(104, 61%, 45%, 1)","hsla(284, 63%, 51%, 1)"]}
        arcLinkLabel="value"
        arcLinkLabelsSkipAngle={19}
        arcLinkLabelsTextOffset={12}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={10}
        arcLinkLabelsDiagonalLength={0}
        arcLinkLabelsStraightLength={36}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.6}
        arcLabelsSkipAngle={21}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
      
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 84,
                translateY: -54,
                itemsSpacing: 0,
                itemWidth: 98,
                itemHeight: 45,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 25,
                symbolSpacing:-15,
                symbolShape: CustomSymbolShape,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)


export default TicketsByStatus