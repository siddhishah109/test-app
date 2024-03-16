import './App.css';
import OutlierGraph from './component/OutlierGraph';
import TrendGraph from './component/TrendGraph';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function App() {
  const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 25 },
    { name: 'Mar', value: 40 },
    { name: 'Apr', value: 35 },
    { name: 'May', value: 45 },
    { name: 'Jun', value: 155 },
    { name: 'Jul', value: 50 },
    { name: 'Aug', value: 60 },
    { name: 'Sep', value: 55 },
    { name: 'Oct', value: 45 },
    { name: 'Nov', value: 35 },
    { name: 'Dec', value: 40 },
  ];
 
  const barData = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 35 },
    { name: 'Mar', value: 45 },
  ];
 
  const areaData = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 15 },
  ];
  
 
  return (
<div className="App">
<TrendGraph
    data={data}
    width={600}
    height={400}
    windowSize={3}
    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
    lineColor="#ff0000"
    strokeWidth={2}
    xAxisProps={{
        dataKey: 'name',
        label: { value: 'Month', position: 'insideBottomRight', offset: -10 }
    }}
    yAxisProps={{ label: { value: 'Value', angle: -90, position: 'insideLeft' } }}
    cartesianGridProps={{ strokeDasharray: '3 3', vertical: false }}
    tooltipProps={{ cursor: { stroke: 'red', strokeWidth: 2 } }}
    legendProps={{ align: 'center', verticalAlign: 'top', height: 36 }}
    lineProps={{ stroke: '#ff0000', strokeWidth: 2, dot: false }}
/> 
<ResponsiveContainer width="30%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>

    <OutlierGraph 
                data={data} 
                width={600} 
                height={400} 
                outlierRadius={8}
                allPointRadius={4}
                cartesianGridProps={{ strokeDasharray: '3 3' }}
                xAxisProps={{ dataKey: 'name', label: { value: 'Month', position: 'insideBottomRight', offset: -10 } }}
                yAxisProps={{ label: { value: 'Value', angle: -90, position: 'insideLeft' } }}
                tooltipProps={{ cursor: { stroke: 'red', strokeWidth: 2 } }}
                scatterProps={{ fill: 'blue' }}
            />
</div>
  );
}
 
export default App;