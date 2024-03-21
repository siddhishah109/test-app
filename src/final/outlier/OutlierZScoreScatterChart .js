import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter ,Legend} from 'recharts';

const OutlierZScoreScatterChart = ({ 
  data, 
  keyX='x', 
  keyY='y', 
  threshold =1, 
  width = 500, 
  height = 300, 
  showOriginalData = true,
  showXAxis = true,
  showYAxis = true,
  showCartesianGrid = false,
  showTooltip = true,
  scatterChartProps = {},
  legendProps = {},
  showLegend = true,
  cartesianGridProps = {}, 
  xAxisProps = {}, 
  yAxisProps = {}, 
  tooltipProps = {}, 
  scatterProps = {}, 
  outliersScatterProps = {},
  responsiveContainerProps = {},
  dataName = 'Data',
  outlierName = 'Outliers',
  originalDatafill = '#8884d8',
  outlierDataFill = '#ff7300',
  xAxisAngle=0,
  xAxisDx=0,
  xAxisDy=0,
  xLabel='',
  yAxisAngle=-90,
  yAxisDx=0,
  yAxisDy=0,
  yLabel='',  
}) => {
  const [outliers, setOutliers] = useState([]);

  useEffect(() => {
    const detectOutliers = (data, keyY, threshold) => {
      const meanY = data.reduce((sum, point) => sum + point[keyY], 0) / data.length;
      const stdDevY = Math.sqrt(data.reduce((sum, point) => sum + Math.pow(point[keyY] - meanY, 2), 0) / data.length);
      return data.filter(point => Math.abs((point[keyY] - meanY) / stdDevY) > threshold);
    };

    const outliers = detectOutliers(data, keyY, threshold);
    setOutliers(outliers);
    console.log("Outliers:", outliers);
  }, [data, keyY, threshold]);

  return (
    <ResponsiveContainer width={width} height={height} {...responsiveContainerProps}>
      <ScatterChart  {...scatterChartProps}>
        {showXAxis && <XAxis dataKey={keyX} type="number" label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />}
        {showYAxis && <YAxis dataKey={keyY} type="number"  label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
        {showTooltip && <Tooltip {...tooltipProps} />}
        {showLegend && <Legend {...legendProps} />} 
        {showOriginalData && <Scatter name={dataName} data={data} fill={originalDatafill} {...scatterProps} />}
        <Scatter name={outlierName} data={outliers} fill={outlierDataFill} {...outliersScatterProps} />
        {showCartesianGrid && <CartesianGrid {...cartesianGridProps} />}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default OutlierZScoreScatterChart;
