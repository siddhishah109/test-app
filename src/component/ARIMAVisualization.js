import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ARIMA from 'arima';

const ARIMAVisualization = ({ data }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    // Perform ARIMA forecasting
    const model = new ARIMA({ data, method: 'MLE', p: 1, d: 1, q: 1 }); // ARIMA(1,1,1) model
    const forecastValues = model.predict(10); // Forecasting 10 steps ahead
    setForecast(forecastValues);
  }, [data]);

  // Prepare data for Recharts
  const chartData = data.map((value, index) => ({ time: index, actual: value }));
  const forecastData = forecast.map((value, index) => ({ time: data.length + index, forecast: value }));

  return (
    <div>
      <h2>ARIMA Forecast</h2>
      <LineChart width={800} height={400} data={[...chartData, ...forecastData]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
        <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Data" />
        <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" />
      </LineChart>
    </div>
  );
};

export default ARIMAVisualization;
