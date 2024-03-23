import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter,Legend } from 'recharts';

const OutlierIQRScatterChart = ({ 
  data, 
  keyX='x', 
  keyY='y', 
  kFactor=0.4, 
  width = 500, 
  height = 300,
  showCartesianGrid = false,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showDataScatter = true,
  showOutliersScatter = true,
  xAxisProps = {},
  yAxisProps = {},
  cartesianGridProps = {},
  tooltipProps = {},
  scatterProps = {},
  outliersScatterProps = {},
  responsiveContainerProps = {},
  scatterChartProps = {},
  xAxisAngle=0,
  xAxisDx=0,
  xAxisDy=0,
  xLabel='',
  yAxisAngle=-90,
  yAxisDx=0,
  yAxisDy=0,
  yLabel='',
  dataName = 'Data',
  outlierName = 'Outliers',
  originalDatafill = '#1e1b75',
  outlierDataFill = '#db4259',
  legendProps = {},
  showLegend = true,

  

}) => {
  const [outliers, setOutliers] = useState([]);

  useEffect(() => {
    const detectOutliers = (data, keyY, kFactor) => {
      const sortedY = data.map(point => point[keyY]).sort((a, b) => a - b);
      const q1Index = Math.floor((sortedY.length - 1) * 0.25);
      const q3Index = Math.floor((sortedY.length - 1) * 0.75);
      const q1 = sortedY[q1Index];
      const q3 = sortedY[q3Index];
      const iqr = q3 - q1;
      const lowerBound = q1 - kFactor * iqr;
      const upperBound = q3 + kFactor * iqr;

      return data.filter(point => point[keyY] < lowerBound || point[keyY] > upperBound);
    };

    const outliers = detectOutliers(data, keyY, kFactor);
    setOutliers(outliers);
    console.log("Outliers:", outliers);
  }, [data, keyY, kFactor]);

  return (
    <ResponsiveContainer width={width} height={height} {...responsiveContainerProps}>
      <ScatterChart   {...scatterChartProps}>
        {showCartesianGrid && <CartesianGrid {...cartesianGridProps} />}
        {showXAxis && <XAxis dataKey={keyX} type="number" label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />}
        {showYAxis && <YAxis dataKey={keyY} type="number"  label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
        {showTooltip && <Tooltip {...tooltipProps} />}
        {showLegend && <Legend {...legendProps} />} 
        {showDataScatter && <Scatter  name={dataName} data={data} fill={originalDatafill}  {...scatterProps} />}
        {showOutliersScatter && <Scatter name={outlierName}  data={outliers} fill={outlierDataFill} {...outliersScatterProps} />}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default OutlierIQRScatterChart;
