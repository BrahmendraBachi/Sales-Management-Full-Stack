import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminService from '../services/AdminService';
import EmployeeService from '../services/EmployeeService';
import ProductSoldService from '../services/ProductSoldService';
import LogOut from './LogOut';
import '../App.css';
import AdminHome from './AdminHome';
import EmployeeHome from './EmployeeHome';

const ProductSold = () => {

 const {id} = useParams();
 const [productsSold, setProductsSold] = useState([])
 const [empId, setEmpId] = useState('');
 const [date, setDate] = useState('');
 var commision = 0;
 var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
        })

 useEffect(() => {
  if(/^[0-9]+$/.test(id)==false)
  {
   console.log("Product Sold is triggered for employees")
   var dum = id.indexOf('e'); 
   var myId = id.slice(0,dum);
   ProductSoldService.getAllProductsSoldById(myId).then((response)=>{
    setProductsSold(response.data);
  }).catch(error=>{
   console.log(error);
  })
 }
 else{
    ProductSoldService.getAllProductServices().then((response)=>{
    setProductsSold(response.data);
    console.log(response.data);
   }).catch(error=>{
      console.log(error);
  })
 }
 }, [])
 
 const backToAdminOREmployee=()=>{
  if(/^[0-9]+$/.test(id))
  {
   return (<Link to={`/Admin/${id}`} className="btn btn-info">Back to Admin Page</Link>)
  }
  else if (id.length>id.indexOf('e')+1) {
    var dum = id.indexOf('e')
    var myId = id.slice(dum+1, id.length);
    return <Link to={`/Admin/${myId}`} className="btn btn-info">Back to Admin Page</Link>
  }
  else{
   var dum = id.indexOf('e'); 
   var myId = id.slice(0,dum);
   return <Link to={`/Employee/${myId}`} className="btn btn-info">Back to Employee Page</Link>
  }
 }

 const myCommision = (commision, empId)=>
 {
   console.log("My employee Id:"+empId);
   if(id.includes('e'))
   {
    return <h4 className='text-danger'> Commision: {formatter.format(commision)} </h4>
   }
 }

 const SalesChartAdminOREmployee=()=>
 {
    return <Link to={`/sales-chart/${id}`} className="btn btn-info"> Total Sales </Link>
 }


 const allProducts=()=>{
    window.location.reload();
 }

 const ProductSoldByMonth=(e)=>{
    e.preventDefault();
    var str = date;
    AdminService.getProductSoldinMonth(str).then((response)=>{
        setProductsSold(response.data);
        console.log(response.data);
    }).catch(error=>{
        console.log(error);
    })
 }

 const ProductSoldByMonthForEmployee=(e)=>{
    e.preventDefault();
    var dum = id.indexOf('e')
    var myId = id.slice(0, dum);
    var str = myId + "d" + date;
    console.log("Product Sold:"+str);
    EmployeeService.getProductsSoldinMonthForEmployee(str).then((response)=>{
        console.log(response.data);
        setProductsSold(response.data);
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
                <button className='btn btn-primary' onClick={(e)=>{ProductSoldByMonth(e)}}>search</button>
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
                <button className='btn btn-primary' onClick={(e)=>{ProductSoldByMonthForEmployee(e)}}>search</button>
            </div>
        )
    }
 }

 const isAdminOrEmployee=()=>{
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
      console.log("Id in product sold:", id);
      var ind = id.indexOf("e");
      var id1 = id.slice(0, ind);
      var empId = {id1}
      return <EmployeeHome data={empId} />
    }
 }

 const approveAll=()=>{

 }

  return (
   <div>
    {
        isAdminOrEmployee()
    }
    <LogOut />
    <div className = "container">
        <div className='text-center'>
            <h1 className = "btn btn-success" onClick={()=>allProducts()}> All Products Sold </h1>
        </div>
         {
            isEmployeeOrAdmin()
         }
            <div>
            {
                productsSold.map(
                    productSoldInMonth =>
                    <tr key={productSoldInMonth.month} className="tableacr">
                        <h2 className='text-center text-primary'> {productSoldInMonth.month} </h2>
                        {
                            myCommision(productSoldInMonth.commision, empId)
                        }
                        <h4 className='text-danger'> Total Sales: {formatter.format(productSoldInMonth.totalSales)} </h4>
                        <h6 className='text-center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                        
                        <table className="tableacr table table-bordered table-striped">
                            <thead>
                              <th> Employee Id </th>
                              <th> Product Id </th>
                              <th> Cost </th>
                              <th> Date </th>
                            </thead>
                            <tbody>
                            {
                                productSoldInMonth.productsSold.map(
                                    product =>
                                    <tr key = {product.id}> 
                                       <td> {product.empId} </td>
                                        <td> {product.productId} </td>
                                        <td> {product.cost} </td>
                                        <td> {product.dateSold} </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        
                    </tr>
                )
            }
            </div>
            <div className='text-center'>
            <div className='p-2'></div>
            {
               SalesChartAdminOREmployee()
            }
        </div>
        {
              backToAdminOREmployee()
        }
        <div className='p-5'></div>
        </div>
      </div>
      
  )
}

export default ProductSold



{/* <table className="table table-bordered table-striped">
                <thead>
                    <th> Employee Id </th>
                    <th> Product Id </th>
                    <th> Cost </th>
                    <th> Date </th>
                </thead>
                <tbody>
                    {
                        productsSold.map(
                            product =>
                            <tr key = {product.id}> 
                                <td> {product.empId} </td>
                                <td> {product.productId} </td>
                                <td> {product.cost} </td>
                                <td> {product.dateSold} </td>
                            </tr>
                        )
                    }
                </tbody>
                // </table> */}