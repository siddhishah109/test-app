// OutlierGraph.js

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function detectOutliers(data) {
    const mean = data.reduce((acc, val) => acc + val.value, 0) / data.length;
    const stdDev = Math.sqrt(data.reduce((acc, val) => acc + (val.value - mean) ** 2, 0) / data.length);
    const outlierThreshold = mean + 3 * stdDev; 
    return data.filter(point => point.value > outlierThreshold);
}

function OutlierGraph({ 
    data, 
    width = 500, 
    height = 300, 
    outlierRadius = 6, 
    allPointRadius = 4,
    cartesianGridProps = {}, 
    xAxisProps = {}, 
    yAxisProps = {}, 
    tooltipProps = {}, 
    scatterProps = {}, 
    ...rest 
}) {
    const outliers = detectOutliers(data);
    const nonOutliers = data.filter(point => !outliers.includes(point));

    // Calculate domain for y-axis
    const minDataValue = Math.min(...data.map(point => point.value));
    const maxDataValue = Math.max(...data.map(point => point.value));
    const padding = 10; // Padding for better visualization
    const minYValue = Math.max(0, minDataValue - padding); // Ensure y-axis starts from 0 or positive value
    const maxYValue = maxDataValue + padding;

    return (
        <ScatterChart width={width} height={height} {...rest}>
            <CartesianGrid {...cartesianGridProps} />
            <XAxis dataKey="name" {...xAxisProps} />
            <YAxis domain={[minYValue, maxYValue]} {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Scatter {...scatterProps} data={nonOutliers} fill="blue">
                {nonOutliers.map((point, index) => (
                    <circle key={index} cx={point.name} cy={point.value} r={allPointRadius} fill="blue" />
                ))}
            </Scatter>
            <Scatter {...scatterProps} data={outliers} fill="red">
                {outliers.map((point, index) => (
                    <circle key={index} cx={point.name} cy={point.value} r={outlierRadius} fill="red" />
                ))}
            </Scatter>
        </ScatterChart>
    );
}

export default OutlierGraph;
