import logo from './logo.svg';
import './App.css';
import FireMap from "./map"

function App() {
  const filterFireData = (data, startDate, endDate) => {
    if (!startDate && !endDate) return data;
  
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    return data.filter((fire) => {
      const fireDate = new Date(fire.StartDate);
      return (!start || fireDate >= start) && (!end || fireDate <= end);
    });
  };
  return (
    <div>
      <FireMap filtered={filterFireData}/>
    </div>
  );
}

export default App;
