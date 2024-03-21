import './App.css';
import OutlierIQRScatterChart from './final/outlier/OutlierIQRScatterChart ';
import ScatterPlot from './component/ScatterPlot';
import OutlierZScoreScatterChart from './final/outlier/OutlierZScoreScatterChart ';
import OutlierKNNScatterChart from './final/outlier/OutlierKNNScatterChart';
import TrendGraph from './component/TrendGraph';
import LinearTrendChart from './final/Trends/LinearTrendChart';
import MovingAverageTrendChart from './final/Trends/MovingAverageTrendChart ';
import SeasonalDecompositionChart from './component/SeasonalDecompositionChart ';




function App() {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 10 },
    { x: 5, y: 6 }
  ];

  return (
<div className="App">
<MovingAverageTrendChart
        data={data}
        windowSize={3} 
        originalLineColor="#8884d8"
        movingAverageLineColor="#82ca9d"
        showXAxis={true}
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
      />


<LinearTrendChart
        data={data}
        dataKey="y"
        lineColor="#8884d8"
        trendLineColor="#82ca9d"
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
        tooltipProps={{ formatter: (value) => `$${value}` }}
        showOriginalLine={true}
        lineProps={{ strokeWidth: 2 }}
      />


<OutlierZScoreScatterChart
  data={data}
  keyX="x"
  keyY="y"
  threshold={1.3}
  // tooltipProps={{ cursor: 'pointer' }}
 
/>

<OutlierKNNScatterChart
  data={data}
  keyX="x"
  keyY="y"
  kNearest={3}
  threshold={5}
/>
<OutlierIQRScatterChart
  data={data}
  keyX="x"
  keyY="y"
  kFactor={0.4}
  tooltipProps={{ cursor: 'pointer' }}
/>

</div>
  );
}
 
export default App;