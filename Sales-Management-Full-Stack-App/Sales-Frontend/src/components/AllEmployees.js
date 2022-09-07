import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';
import EmployeeService from '../services/EmployeeService';
import LogOut from './LogOut';
import '../App.css';
import AdminHome from './AdminHome';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Popup.css'
toast.configure();

const AllEmployees = () => {

const [empId, setEmpId] = useState('');
const [message, setMessage] = useState('');

 const [employees,setEmployees]= useState([]);
 const {id} = useParams();
 const navigate = useNavigate();

 const [popup, setPopup] = useState(false)

 useEffect(() => {
    console.log(id);
   getAllEmployees();
 }, [])
 
 const getAllEmployees =() =>{
  AdminService.getAllEmployees().then((response)=>{

   setEmployees(response.data);
   console.log("Elements "+employees);

  }).catch(error=>{

   console.log(error);

  })
 }

 const ispopup=(id)=>{
  if(popup)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setPopup(false)}>x</button>
          <h3 className='text-danger'>Would you really want to delete employee?</h3>
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
            <button className='btn btn-success' onClick={()=>{deleteEmployee(id)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setPopup(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
}

 const deleteEmployee = (employeeId) => {
       AdminService.deleteEmployee(employeeId).then((response) =>{
        toast.success("Employee Deleted Successfully");
        setPopup(false);
        getAllEmployees();
       }).catch(error =>{
           console.log(error);
       })  
    }

    const EmployeeByEmpId=(e)=>{
        e.preventDefault();
        var id1 = id + '-' + empId;
        EmployeeService.getEmployeeByEmpId(empId).then((response)=>{
            setEmployees(response.data);
            if(response.data.length == 0)
            {
                setMessage("Employee not found");
            }
            else{
                setMessage('');
            }
        })
    }

    const AllEmployees=()=>{
        window.location.reload();
    }

    const gotoAdminHomePage=()=>{
      var id1 = id
      var adminId = {id1};
     return <AdminHome data={adminId} />
    }
  return (
    <div>
     {
       gotoAdminHomePage()
     }
     <LogOut />
      <div className = "container">
            <h2 className = "text-center text-primary"> List Employees </h2>
            <div className='side-by-side'>
                <div>
                    <Link to = {`/add-employee/${id}`} className = "btn btn-primary mb-2" > Add Employee </Link>
                </div>
            </div>
            <div className='button'>
                <div className = "btn btn-success" onClick={()=>AllEmployees()}>All Employees</div>
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                        <input style={{width: "200px"}}
                            type = "text"
                            placeholder = "Search by Employee Id"
                            name = "empId"
                            className = "form-control"
                            value = {empId}
                            onChange = {(e) => setEmpId(e.target.value)}
                         >
                        </input>
                <div className='p-1'></div>
                <button className='btn btn-primary' onClick={(e)=>{EmployeeByEmpId(e)}}>search</button>

            </div>
            <div className='p-1'></div>
            <h4 className='text-danger'>{message}</h4>
            <table className="table table-success table-striped">
                <thead>
                    <th className=''> Id </th>
                    <th> Employee Id </th>
                    <th> Zone Id</th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Phone Number </th>
                    <th> Sales </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td> {employee.id} </td>
                                <td> {employee.empId} </td>
                                <td> {employee.zoneId} </td>
                                <td> {employee.firstName} </td>
                                <td> {employee.lastName} </td>
                                <td> {employee.emailId} </td>
                                <td> {employee.phoneNumber} </td>
                                <td >
                                    <Link className="btn btn-success" to={`/product-sold/${employee.id+"e"+id}`} > View </Link>
                                </td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.id+"u"+id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => setPopup(true)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                    {
                                        ispopup(employee.id)
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='text-center'>
                <Link to={`/Admin/${id}`} className="btn btn-info">Back to Admin Page</Link>
            </div>
            <div className='p-4'>
                
            </div>
        </div>
    </div>
  )
}

export default AllEmployees