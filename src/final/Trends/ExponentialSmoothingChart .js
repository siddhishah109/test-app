import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExponentialSmoothingChart = ({ 
    data,
    alpha=0.2,
    width = 500,
    height = 300,
    xDataKey = "x",
    xLabel = "",
    yLabel = "",
    xAxisAngle = 0,
    xAxisDx = 0,
    xAxisDy = 0,
    yAxisAngle = -90,
    yAxisDx = 0,
    yAxisDy = 0,
    lineChartProps = {},
    cartesianGridProps = {},
    xAxisProps = {},
    yAxisProps = {},
    tooltipProps = {},
    legendProps = {},
    originalLineProps = {},
    trendLineProps = {},
    originalLineName = "Original",
    trendLineName = "Exponential Smoothing",
    dots = false,
    dataKey = "y",
    originalLineColor = "#1e1b75",
    trendLineColor = "#992e3e",
    showYAxis = true,
    showTooltip = true,
    showLegend = true,
    showCartesianGrid = false,
    showXAxis = true,
    showOriginalLine = true,
}) => {
    const [smoothedData, setSmoothedData] = useState([]);

    useEffect(() => {
        
        const performExponentialSmoothing = () => {
            const smoothedDataArray = [data[0]]; 

            for (let i = 1; i < data.length; i++) {
                const smoothedValue = alpha * data[i].population + (1 - alpha) * smoothedDataArray[i - 1].population;
                smoothedDataArray.push({ [xDataKey]: data[i][xDataKey], population: smoothedValue });
            }

            return smoothedDataArray;
        };
        setSmoothedData(performExponentialSmoothing());
    }, [data, alpha, xDataKey]);

    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            {...lineChartProps}
        >
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />}
            {showXAxis && <XAxis dataKey={xDataKey}  label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />}
            {showYAxis && <YAxis label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />}
            {showTooltip && <Tooltip {...tooltipProps} />}
            {showLegend && <Legend {...legendProps} />}
            {showOriginalLine && <Line type="monotone"  dataKey={dataKey} name={originalLineName} stroke={originalLineColor} dot={dots} {...originalLineProps} />}
            <Line type="monotone" dataKey={dataKey} name={trendLineName} stroke={trendLineColor} dot={dots} data={smoothedData} {...trendLineProps}/>
        </LineChart>
    );
};

export default ExponentialSmoothingChart;
