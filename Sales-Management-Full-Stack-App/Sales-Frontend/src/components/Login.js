import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginService from '../services/LoginService';

const Login = () => {


 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 var [message, setMessage] = useState('');
 var {user} = useParams();
 const navigate = useNavigate();

 toast.dismiss();



 const title = () => {
        console.log("Title "+user);
        if(user=="admin"){
            return <h2 className = "text-center">Admin Login</h2>
        }else{
            return <h2 className = "text-center">Employee Login</h2>
        }
    }

    const check = (e) => {
        e.preventDefault();

        const userDetails = {username , password};
        console.log(user);

        if(user=="admin"){
         console.log("Admin");
            LoginService.checkAdmin(userDetails).then((response) => {
                navigate(`/Admin/${response.data.id}`);
            }).catch(error => {
             setMessage("Bad Credentials!!! EmailId or Password does not Exists");
             console.log("Error "+error);
            })
        }else{
         console.log("Employee")
         LoginService.checkEmployee(userDetails).then((response)=>{
          console.log(response.data);
          navigate(`/Employee/${response.data.id}`);
         }).catch(error =>{
          setMessage("Bad Credentials!!! EmailId or Password does not Exists");
          console.log(error);
         })
        }
        
    }

    const gotoForgotPasswordPage=()=>{
        return <Link to={`/forgot-password/${user}`} className='btn btn-link'>forgot password?</Link>
    }


  return (
    <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                         <small className='text-danger'>{message}</small>
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Username </label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter your username"
                                        name = "username"
                                        className = "form-control"
                                        value = {username}
                                        onChange = {(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Enter your password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='text-center'>
                                    <button className = "btn btn-success" onClick = {(e) => check(e)} > Log in  </button>
                                </div>

                            </form>
                            {
                                gotoForgotPasswordPage()
                            }

                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
}

export default Login