import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LinearTrendChart = ({ 
  data, 
  width = 500, 
  height = 300, 
  dataKey = 'y', 
  originallineColor = '#8884d8', 
  trendLineColor = '#82ca9d', 
  dot = false, 
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  showCartesianGrid = false, 
  yAxisProps = {},
  tooltipProps = {},
  legendProps = {},
  lineChartProps = {},
  cartesianGridProps = {},
  xAxisProps = {},
  originalLineProps = {},
  trendLineProps = {},
  showOriginalLine = true,
  originalLineName = 'Original',
  trendLineName = 'Trend'
}) => {
  // Calculate linear regression
  const n = data.length;
  const sumX = data.reduce((acc, d) => acc + d.x, 0);
  const sumY = data.reduce((acc, d) => acc + d.y, 0);
  const sumXY = data.reduce((acc, d) => acc + (d.x * d.y), 0);
  const sumXX = data.reduce((acc, d) => acc + (d.x * d.x), 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY / n) - (slope * sumX) / n;

  const trendLine = data.map(point => ({ x: point.x, y: slope * point.x + intercept }));

  return (
    <LineChart width={width} height={height} data={data} {...lineChartProps}>
      {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />}
      <XAxis dataKey="x" {...xAxisProps} />
      {showYAxis && <YAxis {...yAxisProps} />}
      {showTooltip && <Tooltip {...tooltipProps} />}
      {showLegend && <Legend {...legendProps} />}
      {showOriginalLine && <Line type="monotone" dataKey={dataKey} name={originalLineName} stroke={originallineColor} {...originalLineProps} />}
      <Line type="monotone" data={trendLine} dataKey={dataKey} name={trendLineName} stroke={trendLineColor} dot={dot} {...trendLineProps} />
    </LineChart>
  );
}

export default LinearTrendChart;
