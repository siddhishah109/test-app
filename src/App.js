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
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return (
<div className="App">
{/* <ScatterPlot/> */}

{/* <TrendGraph data={data}/> */}
{/* Zscore
<OutlierZScoreScatterChart
  data={[
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 500 },
    { x: 40, y: 50 },
    { x: 50, y: 60 },
    { x: 70, y: 40 },
    { x: 80, y: 900 },
  ]}
  keyX="x"
  keyY="y"
  threshold={0.7}
  width="80%"
  height={300}
/>
IQR

<OutlierIQRScatterChart
   data={[
    { x: 'A', y: 20 },
    { x: 'B', y: 30 },
    { x: 'C', y: 500 },
    { x: 'D', y: 50 },
    { x: 'E', y: 60 },
    { x: 'F', y: 40 },
    { x: 'G', y: 900 },
  ]}
  keyX="x"
  keyY="y"
  kFactor={1.5}
  width="80%"
  height={300}
/> */}
{/* KNN */}
{/* <OutlierKNNScatterChart
  data={[
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 500 },
    { x: 40, y: 50 },
    { x: 50, y: 60 },
    { x: 70, y: 40 },
    { x: 80, y: 900 },
  ]}
  keyX="x"
  keyY="y"
  kNearest={2}
  threshold={30} 
  width="80%"
  height={300}
/> */}


<LinearTrendChart/>


<MovingAverageTrendChart/>



</div>
  );
}
 
export default App;