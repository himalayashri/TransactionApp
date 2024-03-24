import React, { useEffect, useState } from 'react'
import BarChart from './BarChart';
import { BASE_URL } from '../services/helper';

const BarChartDash = () => {
    const [month, setMonth] = useState(3);
    const [data, setData] = useState([]);
    let salesData = [100, 200, 150, 300, 250, 200, 350];
    
    
    const getData = async(month=3) => {
        let dataa = [];
        setData([]);
        const response = await fetch(`${BASE_URL}/chart/barchart?month=${month}`);
        const jsonData = await response.json();
        jsonData.priceRanges.map((i) => dataa.push(i.count));
        setData(dataa)
    }
    const monthHandler = (e) => {
        setMonth(e.target.value);
        getData(e.target.value)
    }

    useEffect(() => {  
        getData(month);
    }, [])
 

  return (
    <div className='third-div'>
       <h4 className='stats'>Bar Chart Stats</h4>
        <select onChange={monthHandler} defaultValue={3} className="stat-select">
        <option value={1}>Jan</option>
        <option value={2}>Feb</option>
        <option value={3} >March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>Aug</option>
        <option value={9}>Sept</option>
        <option value={10}>Oct</option>
        <option value={11}>Nov</option>
        <option value={12}>Dec</option>
       </select>
    
       <BarChart data={data}/> 
   
    </div>
  )
}

export default BarChartDash