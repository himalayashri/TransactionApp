import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../services/helper';

const TransactionStats = () => {
    const [month, setMonth] = useState(3);
    const [data, setData] = useState({});
    
    const getData = async(month=3) => {
        const response = await fetch(`${BASE_URL}/api/statistics?month=${month}`)
        const jsonData = await response.json();
        setData(jsonData)
    }
    useEffect(() => {
        getData(month);
    },[])
    const monthHandler = (e) => {
        setMonth(e.target.value)
        getData(e.target.value)
    }
  return (
    <div className='second-div'>
        <h4 className='stats'>Statistics</h4>
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
        <div className='transactionStats-div'>
            <table>
                <tbody>
                    <tr>
                        <td>Total Sale Amount</td>
                        <td>{data.totalSaleAmount}</td>
                    </tr>
                    <tr>
                        <td>Total Sold item</td>
                        <td>{data.totalSoldItems}</td>
                    </tr>
                    <tr>
                        <td>Total not sold item</td>
                        <td>{data.totalNotSoldItems}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TransactionStats