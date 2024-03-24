import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../services/helper';

const TransactionDash = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getData = async( month) => {
    try {
     let response = await fetch(`${BASE_URL}/api/transactions?month=${month}&page=${page}&perPage=10&searchText=${search}`);
     let jsonData = await response.json();
     setData(jsonData.transactions);
         
    } catch (error) {
     console.log(error.message);
    }
   }
 
    useEffect(() => {
       
        getData(month);
        
    },[page])

    const monthHandler = (e) => {
     setMonth(e.target.value)
     getData(e.target.value);
   ;
    }

    const searchHandler = (e) => {
      if(e.keyCode === 13){
        getData(month);
     setSearch("");

      }
    }
  return (
    <div className='first-div'>
    <div className='td-head'>Transaction Dashboard</div>
    <div className='month-div'>
       <input onKeyUp={searchHandler} value={search} type="search" placeholder='Search transaction'onChange={(e) => setSearch(e.target.value)}/>
       <select onChange={monthHandler} defaultValue={3} >
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
    </div>
      <div className='transactionDash-div'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
               {data&& data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.sold}</td>
                    <td>{item.image}</td>

                </tr>
               ))}
            </tbody>
        </table>
      

      </div>
      <div className='page-div'>
        <h4>Page: {page}</h4>
        <div className='btn-div'>

        <button className='btn' onClick={() => page !== 1 ?  setPage(page-1): null}>Previous</button>
        <button className='btn' onClick={() => page !== 10 ? setPage(page+1): null}>Next</button>
        </div>
        <h4>Per Page : 10</h4>
        </div>
   </div>
  )
}

export default TransactionDash