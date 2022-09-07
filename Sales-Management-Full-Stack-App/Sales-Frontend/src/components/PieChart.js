import React, { useEffect, useState } from 'react'
import { useParams, useHistory, useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import { Pie } from 'react-chartjs-2';
import '../App.css'


const PieChart = () => {
 const {id} = useParams();
 var ind = id.indexOf("d");
 var month = id.slice(ind+1, id.length);
 let navigate = useNavigate();

 const [userData, setUserData] = useState({
  labels : [],
    datasets: [{
      label : "User Gained",
      data : []
    }]
 })
 useEffect(() => {
  // console.log(id);
  EmployeeService.getMonthlyQuota(id).then((response)=>{
   // console.log(response.data);
   var data = 
   {
    labels : ["Completed Quota", "remainingQuota"],
    datasets : [{
     label : "",
     data : [response.data.completedQuota, response.data.targetQuota-response.data.completedQuota],
     backgroundColor : ["blue", "red"]
    }]
   }
   console.log(data);
   setUserData(data);
  }).catch(error=>{
   console.log(error);
  })
 }, [])

  return (
    <div>
     <div className='text-center'>
      <h2>{month}</h2>
      <div style={{height:'300px',width:'300px',margin:'0 auto'}}>
       <Pie data={userData}/>
       <button className='btn btn-link' onClick={() => navigate(-1)}>Back</button>
     </div>
     </div>
    </div>
  )
}

export default PieChart
