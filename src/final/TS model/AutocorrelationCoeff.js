import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ReferenceLine } from 'recharts';

const AutocorrelationCoeff = ({
  data,
  width = 500,
  height = 400,
  xDataKey = 'lag',
  dataKey = 'pacf',
  xLabel = '',
  yLabel = '',
  xAxisAngle = 0,
  xAxisDx = 0,
  xAxisDy = 0,
  yAxisAngle = 0,
  yAxisDx = 0,
  yAxisDy = 0,
  barFill = '#992e3e',
  barSize = 30,
  showTooltip = false,
  showLegend = false,
  showCartesianGrid = false,
  showXAxis = true,
  showYAxis = true,
  showLabelList = true,
  legendProps = {},
  tooltipProps = {},
  xAxisProps = {},
  yAxisProps = {},
  referenceLineProps = {},
  lag = 5,
}) => {
  const [autocorrelation, setAutocorrelation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (lag+1 > data.length) {
          throw new Error('Lag value exceeds available data points. Reduce lag or increase data points.');
        }

        const response = await axios.post('http://siddhishah.pythonanywhere.com/autocorrelation', {
          data: data,
          lags: lag 
        });
        setAutocorrelation(response.data.autocorrelation);
      } catch (error) {
        console.error('Error fetching autocorrelation data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lag, data]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = autocorrelation.map((value, index) => ({ [xDataKey]: index, [dataKey]: value.toFixed(3) }));

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <path d={`M${x},${y + height}L${x + width / 2},${y}L${x + width},${y + height}Z`} fill={fill} />
    );
  };

  return (
    <div>
      <BarChart width={width} height={height} data={chartData}>
        {showCartesianGrid && <CartesianGrid />}
        {showXAxis && <XAxis dataKey={xDataKey} label={{ value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy }} {...xAxisProps} />}
        {showYAxis && <YAxis label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy }} {...yAxisProps} />}
        {showTooltip && <Tooltip {...tooltipProps} />}
        {showLegend && <Legend {...legendProps} />}
        <ReferenceLine y={0} stroke="#000" {...referenceLineProps} />
        <Bar dataKey={dataKey} fill={barFill} shape={<TriangleBar />} barSize={barSize}>
          {showLabelList && <LabelList dataKey={dataKey} position="right" formatter={(value) => parseFloat(value).toFixed(3)} />}
        </Bar>
      </BarChart>
    </div>
  );
};

export default AutocorrelationCoeff;
