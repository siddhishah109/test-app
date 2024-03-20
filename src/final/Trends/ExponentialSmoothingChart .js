import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExponentialSmoothingChart = () => {
    const [data, setData] = useState([]);
    const [smoothedData, setSmoothedData] = useState([]);
    const alpha = 0.2; // Adjust alpha value as needed

    useEffect(() => {
        // Hardcoded data
        const rawData = [
            { date: '2023-01-01', originalValue: 100 },
            { date: '2023-01-02', originalValue: 120 },
            { date: '2023-01-03', originalValue: 150 },
            { date: '2023-01-04', originalValue: 180 },
            { date: '2023-01-05', originalValue: 200 },
            { date: '2023-01-06', originalValue: 220 },
            { date: '2023-01-07', originalValue: 240 }
        ];

        // Perform exponential smoothing
        const smoothed = performExponentialSmoothing(rawData, alpha);

        // Update state with data
        setData(rawData);
        setSmoothedData(smoothed);
    }, []);

    const performExponentialSmoothing = (data, alpha) => {
        const smoothedData = [];
        let prevSmoothedValue = data[0].originalValue;

        for (let i = 0; i < data.length; i++) {
            const smoothedValue = alpha * data[i].originalValue + (1 - alpha) * prevSmoothedValue;
            smoothedData.push({ date: data[i].date, smoothedValue });
            prevSmoothedValue = smoothedValue;
        }

        return smoothedData;
    };

    // Combine and sort the data
    const combinedData = [...data, ...smoothedData].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Log data for debugging
    console.log('Combined Data:', combinedData);

    return (
        <div>
            <h1>Exponential Smoothing</h1>
            <LineChart width={800} height={400} data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Adjust stroke width and add dots */}
                <Line type="monotone" dataKey="originalValue" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="smoothedValue" stroke="red" strokeWidth={2} dot={{ stroke: 'red', strokeWidth: 2 }} />
            </LineChart>
        </div>
    );
};

export default ExponentialSmoothingChart;
