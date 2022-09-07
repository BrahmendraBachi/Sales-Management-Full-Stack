import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css'

toast.configure();

const LogOut = () => {
 const navigate = useNavigate()
 const Log_Out=()=>{
  console.log("Clear");
  localStorage.clear();
  toast.loading("logging Out, redirecting to Home page", {position : 'top-center'});
  timer();
 }


 const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
      toast.dismiss();
      toast.success("logged out successfully", {autoClose : 2000});
      navigate("/");
  }, 2000);
  return () => clearTimeout(timer);
  }
 
  return (
    <div>
     <div className='button'>
      <p className='btn btn-link' onClick = {() => Log_Out()}> Log Out </p>
     </div>
    </div>
  )
}

export default LogOut
