import './App.css';
import BarChartDash from './components/BarChartDash';
import TransactionDash from './components/TransactionDash';
import TransactionStats from './components/TransactionStats';

function App() {
  return (
    <>
     
        <TransactionDash />
        <TransactionStats />
        <BarChartDash />
     
    </>
  );
}

export default App;
