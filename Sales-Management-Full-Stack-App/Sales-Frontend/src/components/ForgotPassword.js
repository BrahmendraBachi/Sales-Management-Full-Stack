import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../services/AdminService';
import LoginService from '../services/LoginService';


toast.configure();
const ForgotPassword = () => {
 const {user} = useParams();
 const navigate = useNavigate();
 const [emailId, setEmailId] = useState('');
 const [isPresent, setIsPresent] = useState(false);
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [errors, setErrors] = useState({"password" : '', 'confirmPassword' : ''});

const changePassword=(e)=>{
 e.preventDefault();
 var count = 0;
 var dum = {}
 if(password.length == 0)
 {
  dum.password = "*** This field is Required ***";
  count++;
 }
 if(confirmPassword.length == 0)
 {
  count++;
  dum.confirmPassword = "*** Password not matched ***";
 }
 console.log(count, "Errors");
 console.log(errors);
 if(count==0)
 {
  var newPassword = {"username" : emailId, password};
  console.log(newPassword);
  changePasswordDetails(newPassword);
 }
 else{
  console.log("setErrors is Triggered");
  setErrors(dum);
 }
}

const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
      navigate(-1);
  }, 2000);
  return () => clearTimeout(timer);
  }

 const changePasswordDetails=(newDetails)=>
 {
  console.log("is triggered");
  LoginService.changePassword(newDetails).then((response)=>{
   console.log(response.data);
   toast.success("Password Changed Successfully", {autoClose : 2000});
   toast.loading("Redirecting to Login page", {position : 'top-center'});
   timer()
  }).catch(error=>{
   console.log(error);
   toast.error("OOPS!!! Some Internal error has occured")
  })
 }

const checkPassword=(value)=>{
 setConfirmPassword(value);
 if(value != password)
 {
  errors.confirmPassword = "*** Password not matched ***";
 }
 else{
  errors.confirmPassword = "";
 }
 setErrors(errors);
}

 const newPasswordDetails=()=>{
  if(isPresent)
  {
   return (
    <div>
     <h2 className='text-center'>Change Password</h2>
     <div className = "form-group mb-2">
          <label className = "form-label">New Password </label>
          <input
                type = "password"
                placeholder = "new password"
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
                placeholder = "confirm new password"
                name = "confirmPassword"
                className = "form-control"
                value = {confirmPassword}
                onChange = {(e) => checkPassword(e.target.value)}
          >
          </input>
          <small className='text-danger'>{errors.confirmPassword}</small>
     </div>
     <button className='btn btn-primary' onClick={(e)=>changePassword(e)}>Set Password</button>
    </div>
   )
  }
 }

 const checkUsername=(e)=>{
  e.preventDefault();
  console.log(e.target.value);
  LoginService.checkUser(emailId).then((response)=>{
   console.log(response.data)
   toast.success("EmailId exixts", {position : toast.POSITION.TOP_CENTER});
   setIsPresent(true);
  }).catch(error=>{
   console.log("Error is occured");
   console.log(error);
   setIsPresent(false);
   toast.error("OOPS!!! EmailId not exixts", {position : toast.POSITION.TOP_CENTER});
  })
 }
  return (
    <div>
      <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       <h2 className='text-center'>Forgot Password</h2>
                       <h4 className='text-center'>Find your account</h4>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id </label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter your EmailId"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='text-center'>
                                 <button onClick={(e)=> checkUsername(e)}>Find</button>
                                </div>
                                {
                                 newPasswordDetails()
                                }
                            </form>

                        </div>
                    </div>
                </div>

           </div>
    </div>
  )
}

export default ForgotPassword
