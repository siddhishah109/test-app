import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const OutlierKNNScatterChart = ({ data, keyX, keyY, kNearest, threshold, width = '80%', height = 300 }) => {
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

export default OutlierKNNScatterChart;
