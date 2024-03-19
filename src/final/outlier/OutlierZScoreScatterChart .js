import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const OutlierZScoreScatterChart = ({ data, keyX, keyY, threshold, width = '80%', height = 300 }) => {
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

export default OutlierZScoreScatterChart;
