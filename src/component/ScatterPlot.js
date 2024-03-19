import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 500 },
    { x: 40, y: 50 },
    { x: 50, y: 60 },
    { x: 70, y: 40 },
    { x: 80, y: 900 },
  ];
  
const ScatterPlot = () => {
  return (
    <ResponsiveContainer width="60%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" />
        <YAxis dataKey="y" type="number" />
        <Tooltip />
        <Scatter name="Data" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
