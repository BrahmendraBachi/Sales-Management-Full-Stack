import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AdminService from '../services/AdminService'
import AdminHome from './AdminHome'
import LogOut from './LogOut'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Popup.css'

toast.configure();


const ApprovalRequests = () => {
 const [approvalRequests, setApprovalRequests] = useState([])
 const {id} = useParams();
 const [message, setMessage] = useState('');
 const navigate = useNavigate();
 const [popup, setPopup] = useState(false);

 useEffect(() => {
  goToApprovalRequests()
 }, [])

 const goToApprovalRequests=()=>{
  AdminService.getApprovalRequests().then((response)=>{
   setApprovalRequests(response.data);
  }).catch(error=>{
   console.log(error);
   toast.error("Some Internal error has occured");
  })
 }
 const gotoAdminHome=()=>{
  var id1 = id
  var adminId = {id1};
  return <AdminHome data={adminId} />
}

const ispopup=(id)=>{
  if(popup)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setPopup(false)}>x</button>
          <h3 className='text-danger'>Would you really want to deny the request?</h3>
          <div className='side-by-side1'>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-2'></div>
            {/* <div className='p-1'></div>
            <div className='p-1'></div>
            <div className='p-2'></div>
            <div className='p-2'></div> */}
            <button className='btn btn-success' onClick={()=>{deleteRequest(id)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setPopup(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
}



const deleteRequest=(pId)=>{
 console.log("Delete Request Id:", pId);
 AdminService.DeleteRequest(pId).then((response)=>{
  setApprovalRequests(response.data);
  toast.success("Request Denied Successfully");
  setPopup(false);
  if(response.data.length == 0)
  {
   navigate(`/Admin/${id}`);
  }
 }).catch(error=>{
  console.log(error);
  toast.error("Some Internal error has occured");
 })
}

const ApproveRequest=(pId)=>{
 console.log("Approval Request Id:", pId);
 AdminService.ApproveRequest(pId).then((response)=>{
  setApprovalRequests(response.data);
  toast.success("Request Approved Successfully");
  if(response.data.length == 0)
  {
   navigate(`/Admin/${id}`);
  }
 }).catch(error=>{
  console.log(error);
  toast.error("Some Internal error has occured");
 })
}

const isPendingRequestsPresent=()=>{
  if(approvalRequests.length>0)
  {
    return (
      <div>
        <div className='text-center'>
       <h2 className='text-primary'>Pending Requests</h2>
      </div>
     <div className='container'>
      <div className='button'>
           <button className='btn btn-primary' onClick={()=>approveAll()}>Approve All</button>
      </div>
      <div className='p-1'></div>
      <table className="tableacr table table-bordered table-striped">
                            <thead>
                              <th> Employee Id </th>
                              <th> Product Id </th>
                              <th> Cost </th>
                              <th> Date </th>
                              <th> Action </th>
                            </thead>
                            <tbody>
                            {
                                approvalRequests.map(
                                    product =>
                                    <tr key = {product.id}> 
                                       <td> {product.empId} </td>
                                        <td> {product.productId} </td>
                                        <td> {product.cost} </td>
                                        <td> {product.dateSold} </td>
                                        <td> 
                                         <button className = "btn btn-danger" onClick = {() => ApproveRequest(product.id)}
                                    style = {{marginLeft:"10px"}}> Approve </button>
                                    <button className = "btn btn-danger" onClick = {() => setPopup(true)}
                                    style = {{marginLeft:"10px"}}> Deny </button>
                                        </td>
                                        {
                                          ispopup(product.id)
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        </div>
      </div>
    )
  }
  else{
    return <h1 className='text-success text-center'> No Pending Requests for Approval </h1>
  }
}

const approveAll=()=>{
 AdminService.approveAllPendingRequests().then((response)=>{
  console.log("Approve all is triggered");
  toast.success("Approved all requests Successfully", {autoClose:2000});
  toast.loading("Redirecting to Home page", {position : 'top-center'});
  timer();
 }).catch(error=>{
  toast.error("Some Internal error has occured");
 })
}

const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
       navigate(`/Admin/${id}`);
  }, 2000);
  return () => clearTimeout(timer);
  }
 
  return (
    <div>
     {
        gotoAdminHome()
     }
     <LogOut />
     {
      isPendingRequestsPresent()
     }
     {/* <div className='text-center'>
       <h2 className='text-primary'>Pending Requests</h2>
      </div>
     <div className='container'>
      <div className='button'>
           <button className='btn btn-primary' onClick={()=>approveAll()}>Approve All</button>
      </div>
      <div className='p-1'></div>
      <table className="tableacr table table-bordered table-striped">
                            <thead>
                              <th> Employee Id </th>
                              <th> Product Id </th>
                              <th> Cost </th>
                              <th> Date </th>
                              <th> Action </th>
                            </thead>
                            <tbody>
                            {
                                approvalRequests.map(
                                    product =>
                                    <tr key = {product.id}> 
                                       <td> {product.empId} </td>
                                        <td> {product.productId} </td>
                                        <td> {product.cost} </td>
                                        <td> {product.dateSold} </td>
                                        <td> 
                                         <button className = "btn btn-danger" onClick = {() => ApproveRequest(product.id)}
                                    style = {{marginLeft:"10px"}}> Approve </button>
                                    <button className = "btn btn-danger" onClick = {() => setPopup(true)}
                                    style = {{marginLeft:"10px"}}> Deny </button>
                                        </td>
                                        {
                                          ispopup(product.id)
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        </div> */}
    </div>
  )
}

export default ApprovalRequests
