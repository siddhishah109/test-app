import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const OutlierIQRScatterChart = ({ data, keyX, keyY, kFactor, width = '80%', height = 300 }) => {
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
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis dataKey={keyX} type="number" />
        <YAxis dataKey={keyY} type="number" />
        <Tooltip />
        <Scatter name="Data" data={data} fill="#8884d8" />
        <Scatter name="Outliers" data={outliers} fill="#ff0000" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default OutlierIQRScatterChart;
