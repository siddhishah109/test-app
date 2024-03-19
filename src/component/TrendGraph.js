import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function generateForecast(data, windowSize) {
    const forecastedData = [...data];

    for (let i = 0; i < data.length; i++) {
        if (i >= windowSize) {
            const sum = data.slice(i - windowSize, i).reduce((acc, val) => acc + val.value, 0);
            const average = sum / windowSize;
            forecastedData.push({ name: `Fcst ${i}`, value: average });
        }
    }

    return forecastedData;
}




function TrendGraph({ data, windowSize = 3, xAxisProps = {}, yAxisProps = {}, cartesianGridProps = {}, tooltipProps = {}, legendProps = {}, lineProps = {}, ...rest }) {
    const forecastedData = generateForecast(data, windowSize);

    return (
        <LineChart width={500} height={300} data={forecastedData} {...rest}>
            <CartesianGrid {...cartesianGridProps} />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Legend {...legendProps} />
            <Line type="monotone" dataKey="value" {...lineProps} />
        </LineChart>
    );
}

export default TrendGraph;
