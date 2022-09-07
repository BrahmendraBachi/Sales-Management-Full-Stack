
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import AdminService from '../services/AdminService';
import BarChart from './BarChart';
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import SalesData from '../Data/SalesData'
import EmployeeService from '../services/EmployeeService';
import AdminHome from './AdminHome';
import EmployeeHome from './EmployeeHome';
import LogOut from './LogOut';
import { useNavigate } from 'react-router-dom';


var valid = 2;

const SalesChart = () => {
  var {id} = useParams();
  const [totalSales, setTotalSales] = useState([])
  const [userData, setUserData] = useState([])
  const [date, setDate] = useState('');
  let navigate = useNavigate();

  useEffect(() => {

  if(/^[0-9]+$/.test(id))
  {
    console.log("AdminID is Triggered");
    AdminService.getTotalSales().then((response)=>{
      console.log("Response Data 2:")
      console.log(response.data)
      for(let i=0; i < response.data.length; i++)
      {
        var sales = response.data[i].totalSalesinMonth;
        var colors = getColors(sales);
        response.data[i].totalSalesinMonth=
        {
          labels : sales.map((data)=>data.date),
          datasets : [{
            label : "Total Sales Per Day",
            data : sales.map((data)=>data.totalSales),
             backgroundColor : colors
          }]
        }
      }
      setUserData(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }
  else{
    var ind = id.indexOf("e")
    var id1 = id.slice(0, ind)
    EmployeeService.getSalesById(id1).then((response)=>{
      console.log("Response Data 2:");
      console.log(response.data);
      for(let i=0; i < response.data.length; i++)
      {
        var sales = response.data[i].totalSalesinMonth;
        var colors = getColors(sales);
        response.data[i].totalSalesinMonth=
        {
          labels : sales.map((data)=>data.date),
          datasets : [{
            label : "Total Sales Per Day",
            data : sales.map((data)=>data.totalSales),
            backgroundColor : colors
          }]
        }
      }
      setUserData(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }
  }, [])


  const TotalSales=()=>{
    window.location.reload();
  }

  const SalesForEmployeeInMonth=(e)=>{
    e.preventDefault();
    console.log(date);
    var ind = id.indexOf("e")
    var id1 = id.slice(0, ind)
    var str = id1 + "d" + date;
    EmployeeService.getSalesForEmployeeInMonth(str).then((response)=>{
      console.log(response.data);
      for(let i=0; i < response.data.length; i++)
      {
        var sales = response.data[i].totalSalesinMonth;
        var colors = getColors(sales);
        response.data[i].totalSalesinMonth=
        {
          labels : sales.map((data)=>data.date),
          datasets : [{
            label : "Total Sales Per Day",
            data : sales.map((data)=>data.totalSales),
            backgroundColor : colors
          }]
        }
      }
      setUserData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const getColors=(data)=>{
    console.log("data");
    console.log(data)
    var colors = []
    for(let i=0;i<data.length;i++)
    {
      if(i==0)
      {
        colors.push("blue");
      }
      else if(data[i].totalSales>data[i-1].totalSales)
      {
        colors.push("blue")
      }
      else{
        colors.push("red");
      }
      // }
      // if(data[i].totalSales<3333333)
      // {
      //   colors.push("red");
      // }
      // else if(data[i].totalSales>3333333 && data[i].totalSales<3333333*2)
      // {
      //   colors.push("blue");
      // }
      // else{
      //   colors.push("green")
      // }
    }
    return colors;
  }

  const SalesForMonth=(e)=>{
    e.preventDefault();
    AdminService.getTotalSalesInMonth(date).then((response)=>{
      console.log(response.data);
      for(let i=0; i < response.data.length; i++)
      {
        var sales = response.data[i].totalSalesinMonth;
        var colors = getColors(sales);
        console.log(colors);
        response.data[i].totalSalesinMonth=
        {
          labels : sales.map((data)=>data.date),
          datasets : [{
            label : "Total Sales Per Day",
            data : sales.map((data)=>data.totalSales),
            backgroundColor : colors
          }]
        }
      }
      setUserData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const isEmployeeOrAdmin=()=>{
    if(/^[0-9]+$/.test(id))
    {
      return (
            <div className='button'>
                <input style={{width: "200px"}}
                            type = "text"
                            placeholder = "search by dddd-MM"
                            name = "date"
                            className = "form-control"
                            value = {date}
                            onChange = {(e) => setDate(e.target.value)}
                         >
                        </input>
                <div className='p-1'></div>
                <button className='btn btn-primary' onClick={(e)=>{SalesForMonth(e)}}>search</button>
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            </div>
        )
    }
    else{
      return (
            <div className='button'>
                <input style={{width: "200px"}}
                            type = "text"
                            placeholder = "search by dddd-MM"
                            name = "date"
                            className = "form-control"
                            value = {date}
                            onChange = {(e) => setDate(e.target.value)}
                         >
                        </input>
                <div className='p-1'></div>
                <button className='btn btn-primary' onClick={(e)=>{SalesForEmployeeInMonth(e)}}>search</button>
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            </div>
        )
    }
  }

  const GoToPieChart=(month)=>{
    if(id.includes("e"))
    {
      var ind = id.indexOf("e")
      var id2 = id.slice(0, ind)
      var id1 = id2+"d";
      var monthStr = '';
      var ind = month.indexOf('-');
      monthStr = monthStr+month.slice(0, ind-1);
      monthStr = id1+monthStr+"-"+month.slice(ind+2, month.length);
      console.log(monthStr);
      return <Link className='btn btn-warning' to={`/Pie-Chart/${monthStr}`}>Pie Chart</Link>
    }
  }

  const isAdminorEmployee=()=>{
    if(/^[0-9]+$/.test(id))
    {
      var id1 = id;
      var adminId = {id1};
      return <AdminHome data={adminId} />   
    }
    else if (id.length>id.indexOf('e')+1) {
        var dum = id.indexOf('e')
        var id1 = id.slice(dum+1, id.length);
        var adminId = {id1}
        return <AdminHome data={adminId} />
     }
    else{
      var ind = id.indexOf("e");
      var id1 = id.slice(0, ind);
      var empId = {id1}
      return <EmployeeHome data={empId} />
    }
  }

  return (
    <div>
      {
        isAdminorEmployee()
      }
      <LogOut />
        <div className='side-by-side'>
        {/* <span id="boot-icon" className="bi bi-arrow-return-left" style="font-size:10rem">Bachi</span> */}
        <button className='btn btn-link' onClick={() => navigate(-1)}>Go To Back Page</button>
        </div>
      
      <div className='p-1'></div>
      <div className='text-center'>
        <button className='btn btn-success ' onClick={()=>TotalSales()}>Total Sales</button>
      </div>
      
      {
          isEmployeeOrAdmin()
      }
      <div className='container-style'>
        <div className='button'>

        </div>
      <div style={{width: 1000, height:100}}>
        {
          userData.map(
            dataMonth =>
            <tr key={dataMonth.month}>
              <h2 className='text-warning text-center'> {dataMonth.month} </h2>
              {
                GoToPieChart(dataMonth.month)
              }
              <h6 className='text-center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
              <Bar data = {dataMonth.totalSalesinMonth}> </Bar>
              <div className='p-3'>

              </div>
            </tr> 
          )
        }
        <div className='p-5'>

        </div>
      </div>
      </div>
    </div>
  )
}

export default SalesChart