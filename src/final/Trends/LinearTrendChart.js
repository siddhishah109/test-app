import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LinearTrendChart = ({ 
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
  originallineColor = '#8884d8', 
  trendLineColor = '#82ca9d', 
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  showCartesianGrid = false, 
  showXAxis = true,
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
  trendLineName = 'Linear Trend',
  dots=false
}) => {
  // Calculate linear regression
  const n = data.length;
  const sumX = data.reduce((acc, d) => acc + d[xDataKey], 0); 
  const sumY = data.reduce((acc, d) => acc + d.y, 0);
  const sumXY = data.reduce((acc, d) => acc + (d[xDataKey] * d.y), 0); 
  const sumXX = data.reduce((acc, d) => acc + (d[xDataKey] * d[xDataKey]), 0); 
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY / n) - (slope * sumX) / n;

  const trendLine = data.map(point => ({ x: point[xDataKey], y: slope * point[xDataKey] + intercept }));

  return (
    <LineChart width={width} height={height} data={data} {...lineChartProps}>
      {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />}
      {showXAxis && <XAxis dataKey={xDataKey}  label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />} 
      {showYAxis && <YAxis label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
      {showTooltip && <Tooltip {...tooltipProps} />}
      {showLegend && <Legend {...legendProps} />}
      {showOriginalLine && <Line type="monotone" dataKey={dataKey} name={originalLineName} stroke={originallineColor} dot={dots} {...originalLineProps} />}
      <Line type="monotone" data={trendLine} dataKey={dataKey} name={trendLineName} stroke={trendLineColor} dot={dots} {...trendLineProps} />
    </LineChart>
  );
}

export default LinearTrendChart;
