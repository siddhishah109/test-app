import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter ,Legend} from 'recharts';

const OutlierKNNScatterChart = ({ 
  data, 
  keyX='x', 
  keyY='y', 
  kNearest=3,
  threshold=5,
  width = 500, 
  height = 300,
  showXAxis = true,
  showYAxis = true,
  showCartesianGrid = false,
  showTooltip = true,
  showDataScatter = true,
  showOutliersScatter = true,
  xAxisProps = {},
  yAxisProps = {},
  cartesianGridProps = {},
  tooltipProps = {},
  scatterProps = {},
  outliersScatterProps = {},
  dataName = 'Data',
  outlierName = 'Outliers',
  originalDatafill = '#1e1b75',
  outlierDataFill = '#db4259',
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
  legendProps = {},
  showLegend = true,


}) => {
  const [outliers, setOutliers] = useState([]);

  useEffect(() => {
    const calculateDistance = (point1, point2) => {
      const dx = point1[keyX] - point2[keyX];
      const dy = point1[keyY] - point2[keyY];
      return Math.sqrt(dx * dx + dy * dy);
    };

    const detectOutliers = (data, kNearest, threshold) => {
      const outliers = [];

      for (let i = 0; i < data.length; i++) {
        const distances = [];

        for (let j = 0; j < data.length; j++) {
          if (i !== j) {
            distances.push({
              index: j,
              distance: calculateDistance(data[i], data[j])
            });
          }
        }

        distances.sort((a, b) => a.distance - b.distance);

        const meanDistance = distances.slice(0, kNearest).reduce((sum, distance) => sum + distance.distance, 0) / kNearest;

        if (meanDistance > threshold) {
          outliers.push(data[i]);
        }
      }

      return outliers;
    };

    const outliers = detectOutliers(data, kNearest, threshold);
    setOutliers(outliers);
    console.log("Outliers:", outliers);
  }, [data, keyX, keyY, kNearest, threshold]);

  return (
    <ResponsiveContainer width={width} height={height} {...responsiveContainerProps}>
      <ScatterChart {...scatterChartProps}>
        {showCartesianGrid && <CartesianGrid {...cartesianGridProps} />}
        {showXAxis && <XAxis dataKey={keyX} type="number" label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />}
        {showYAxis && <YAxis dataKey={keyY} type="number" label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
        {showTooltip && <Tooltip {...tooltipProps} />}
        {showLegend && <Legend {...legendProps} />} 
        {showDataScatter && <Scatter name={dataName} data={data}  fill={originalDatafill} {...scatterProps} />}
        {showOutliersScatter && <Scatter name={outlierName} data={outliers}  fill={outlierDataFill} {...outliersScatterProps} />}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default OutlierKNNScatterChart;
