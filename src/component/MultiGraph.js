import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MultiGraph = ({ lineData, barData, areaData, scatterData, lineProps,lineChartProps,  barProps,barChartProps, areaProps,areaChartProps ,scatterProps, scatterChartProps,xAxisProps, yAxisProps, cartesianGridProps, tooltipProps, legendProps, defaultDataKey }) => {
  const renderLineChart = () => {
    if (lineData) {
      const dataKey = lineProps && lineProps.dataKey ? lineProps.dataKey : defaultDataKey;
      return (
        <LineChart data={lineData} {...lineChartProps} >
          <CartesianGrid {...cartesianGridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          <Line {...lineProps} dataKey={dataKey} />
        </LineChart>
      );
    }
    return null;
  };

  const renderBarChart = () => {
    if (barData) {
      const dataKey = barProps && barProps.dataKey ? barProps.dataKey : defaultDataKey;
      return (
        <BarChart data={barData} {...barChartProps}>
          <CartesianGrid {...cartesianGridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          <Bar {...barProps} dataKey={dataKey} />
        </BarChart>
      );
    }
    return null;
  };

  const renderAreaChart = () => {
    if (areaData) {
      const dataKey = areaProps && areaProps.dataKey ? areaProps.dataKey : defaultDataKey;
      return (
        <AreaChart data={areaData} {...areaChartProps}>
          <CartesianGrid {...cartesianGridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          <Area {...areaProps} dataKey={dataKey} />
        </AreaChart>
      );
    }
    return null;
  };

  const renderScatterChart = () => {
    if (scatterData) {
      const dataKey = scatterProps && scatterProps.dataKey ? scatterProps.dataKey : defaultDataKey;
      return (
        <ScatterChart data={scatterData} {...scatterChartProps}>
          <CartesianGrid {...cartesianGridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          <Scatter {...scatterProps} dataKey={dataKey} />
        </ScatterChart>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      {renderLineChart()}
      {renderBarChart()}
      {renderAreaChart()}
      {renderScatterChart()}
    </ResponsiveContainer>
  );
};

export default MultiGraph;




{/* <MultiGraph
    lineData={lineData}
    barData={barData}
    areaData={areaData}
    scatterData={scatterData}
    defaultDataKey="value" // Default data key
    lineProps={{ stroke: '#8884d8' }}
    barProps={{ fill: '#82ca9d' }}
    areaProps={{ stroke: '#8884d8', fill: '#8884d8' }}
    scatterProps={{ fill: '#8884d8' }}
    xAxisProps={{ dataKey: 'name' }}
    yAxisProps={{ label: { value: 'Values', angle: -90, position: 'insideLeft' } }}
    cartesianGridProps={{ strokeDasharray: '3 3' }}
    tooltipProps={{ cursor: 'pointer', formatter: (value, name) => [value, name] }}
    legendProps={{ align: 'right', verticalAlign: 'top', layout: 'horizontal' }}
  /> */}