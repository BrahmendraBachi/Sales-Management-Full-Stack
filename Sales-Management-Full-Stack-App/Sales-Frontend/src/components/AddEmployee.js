import React from 'react'
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import EmployeeService from '../services/EmployeeService';
import LogOut from './LogOut';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

 const AddEmployee = () => {
 const [empId, setEmpId] = useState('');
 const [zoneId, setZoneId] = useState('');
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [emailId, setEmailId] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [password, setPassword] = useState('');
 const [errors, setErrors] = useState({})
 const [confirmPassword, setConfirmPassword] = useState('');
 const navigate = useNavigate();
 var {id} = useParams();
 var id1, id2;
 if(isNaN(id))
 {
    var dum = id.indexOf("u");
    id1 = id.slice(0,dum);
    id2 = id.slice(dum+1, id.length)
 }
 
 const [zones, setZones] = useState([]);

 const checkPassword=(value)=>{
    setConfirmPassword(value);
    var dum = errors
    if(password != value)
    {
        console.log("password is matched", password, confirmPassword);
        dum["confirmPassword"] = " ***Password is not matching *** ";
        setErrors(dum);
    }
    else{
        console.log("password is matched");
        dum["confirmPassword"] = "";
        setErrors(dum);
    }
 }

 useEffect(() => {
   AdminService.getAllZones().then((response)=>{
   setZones(response.data);
  }).catch(error=>{
   console.log(error);
   toast.error("Some Internal Error has occured");
  })
  if(isNaN(id))
  {
    getEmployeeById(id1);
  }
 }, [])
 
 
 var options = [];
 for(let i=0;i<zones.length;i++)
 {
  var dum={};
  dum["label"]=zones[i].city;
  dum["value"]=zones[i].zoneId;
  options.push(dum);
 }



 const saveEmployee = (e) =>{
  e.preventDefault();
  console.log(errors);
  if(errors.confirmPassword.length!=0)
  {
    return 
  }
  var count = 0;
  var employee = {empId, zoneId, firstName, lastName, emailId, phoneNumber, password};
  var dum = {}
  dum.confirmPassword = errors.confirmPassword;
  for(let i in employee)
  {
    if(employee[i].length == 0)
    {
        count ++;
        dum[i] = "***This field is required***";
    }
  }
  console.log("errors");
  console.log(dum, count)
  if(count==0)
  {
    newEmployee(employee);
  }
  else{
    console.log("Errors are set");
    setErrors(dum);
  }
 }

 const updateEmployee = (e) =>{
  e.preventDefault();
  var employee1 = {empId, zoneId, firstName, lastName, emailId, phoneNumber, password}
  console.log(employee1);
  EmployeeService.updateEmployee(employee1, id1).then((response)=>{
    toast.success("Employee Details Updated Successfully");
    navigate(`/Employees/${id2}`);
  }).catch(error=>{
    toast.error("Some Internal has occured");
  })
 }


 const newEmployee=(employee)=>{
  AdminService.AddEmployee(employee).then((response)=>{
    toast.success("New Employee Added Successfully");
   navigate(`/Employees/${id}`)
  }).catch(error=>{
    toast.error("Some Internal has occured");
   console.log(error);
  })
 }
 const title = () =>{
    if(isNaN(id))
    {
        return <h2 className = "text-center"> Update Employee </h2>
    }
    else
    {
        return <h2 className = "text-center"> Add Employee </h2>
    }
 }

 const getEmployeeById = (id1) =>
 {
    EmployeeService.getEmployeeById(id1).then((response)=>{
        setEmpId(response.data.empId);
        setZoneId(response.data.zoneId);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmailId(response.data.emailId);
        setPassword(response.data.password);
        setPhoneNumber(response.data.phoneNumber);
        setConfirmPassword(response.data.password);
    }).catch(error=>{
        console.log(error);
        toast.error("Some Internal Error has occured");
        
    })
 }

 const addORUpdate=()=>{
    if(isNaN(id))
    {
        return <button className = "btn btn-success" onClick = {(e) => updateEmployee(e)} >Submit </button>
    }
    else
    {
        return <button className = "btn btn-success" onClick = {(e) => saveEmployee(e)} > Submit </button>
    }

 }

 const cancelToast=()=>{
    if(isNaN(id))
    {
        toast.success("Update Cancelled");
    }
    else{
        toast.success("Adding new Employee cancelled Successfully");
    }
 }
 
 const Cancel=()=>{
    // var dum = id.indexOf("u");
    // id1 = id.slice(0,dum);
    // id2 = id.slice(dum+1, id.length)
    if(isNaN(id))
    {
        return <Link to={`/Employees/${id2}`} className="btn btn-danger " onClick={()=>{cancelToast()}}> Cancel </Link>
    }
    else{
        return <Link to={`/Employees/${id}`} className="btn btn-danger " onClick={()=>cancelToast()}> Cancel </Link>
    }
 }
 

 const check=()=>{
    console.log(options);
 }
  return (
    <div>
        <LogOut />
        {/* {
            check()
        } */}
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {/* <h2 className = "text-center"> Add Employee </h2> */}
                       {
                        title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Employee Id: </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Employee Id"
                                        name = "empId"
                                        className = "form-control"
                                        value = {empId}
                                        onChange = {(e) => setEmpId(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{
                                    errors.empId
                                    }</small>
                                </div>
                                <br />
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Select Zone: </label>
                                    <select className='text-align-center' onChange={(e)=>{
                                     setZoneId(e.target.value);
                                    }}>
                                     {
                                     options.map((option) => (<option value={option.value}>{option.label}</option>))
                                     }
                                    </select>
                                    <small className='text-danger'>{errors.zoneId}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name: </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter your First Name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.firstName}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Last Name: "
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.lastName}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter Email Id"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.emailId}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Phone Number: </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Phone Number"
                                        name = "phoneNumber"
                                        className = "form-control"
                                        value = {phoneNumber}
                                        onChange = {(e) => setPhoneNumber(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.phoneNumber}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Enter Password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.password}</small>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Confirm Password </label>
                                    <input
                                        type = "password"
                                        placeholder = "Confirm Password"
                                        name = "confirmPassword"
                                        className = "form-control"
                                        value = {confirmPassword}
                                        onChange = {(e) => checkPassword(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.confirmPassword}</small>
                                </div>
                                {/* <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Submit </button> */}
                                {
                                    addORUpdate()
                                }
                                {
                                    Cancel()
                                }
                            </form>
                        </div>
                    </div>
                </div>

           </div>
           <br />
           <br />
           <div className='p-3'></div>
        </div>
  )
}

export default AddEmployee