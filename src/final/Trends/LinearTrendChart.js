import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class LinearTrendChart extends React.Component {
  render() {
    const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 6 },
     
    ];

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
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <Line type="monotone" data={trendLine} dataKey="y" stroke="#82ca9d" dot={false} />
      </LineChart>
    );
  }
}

export default LinearTrendChart;
