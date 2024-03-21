import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ExponentialSmoothingChart = ({ 
  data, 
  width = 500, 
  height = 300, 
  xDataKey = 'x', 
  dataKey = 'y', 
  xLabel='',
  yLabel='',
  xAxisAngle=0,
  xAxisDx=0,
  xAxisDy=0,
  yAxisAngle=-90,
  yAxisDx=0,
  yAxisDy=0,
  lineColor = '#8884d8', 
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  showCartesianGrid = true, // Ensure Cartesian grid is visible
  showXAxis = true,
  yAxisProps = {},
  tooltipProps = {},
  legendProps = {},
  lineChartProps = {},
  cartesianGridProps = {},
  xAxisProps = {},
  lineProps = {},
}) => {
  // Calculate exponential smoothing
  const alpha = 0.2; // Smoothing factor (0 < alpha < 1)
  const smoothedData = [data[0][dataKey]];
  for (let i = 1; i < data.length; i++) {
    smoothedData.push(alpha * data[i][dataKey] + (1 - alpha) * smoothedData[i - 1]);
  }

  return (
    <LineChart width={width} height={height} data={data} {...lineChartProps}>
      {showCartesianGrid && <CartesianGrid {...cartesianGridProps} />}
      {showXAxis && <XAxis dataKey={xDataKey}  label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />} 
      {showYAxis && <YAxis label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
      {showTooltip && <Tooltip {...tooltipProps} />}
      {showLegend && <Legend {...legendProps} />}
      <Line type="monotone" dataKey={dataKey} name="Original" stroke={lineColor} {...lineProps} />
      <Line type="monotone" data={smoothedData} dataKey={dataKey} name="Smoothed" stroke={lineColor} strokeDasharray="5 5" {...lineProps} />
    </LineChart>
  );
}

export default ExponentialSmoothingChart;
