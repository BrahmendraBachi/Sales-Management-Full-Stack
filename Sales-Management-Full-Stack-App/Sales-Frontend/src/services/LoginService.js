import React from 'react'
import axios from 'axios'
const baseUrl_For_Login = "http://localhost:8080/login"
const baseUrl_for_Admin = "http://localhost:8080/Admin";
const baseUrl_for_Employee = "http://localhost:8080/Employee";
class LoginService{
 
 checkAdmin(admin){

  return axios.post(`${baseUrl_for_Admin}/Login`,admin);

 }

 checkEmployee(employee){
  console.log("check employee is Triggered "+employee);
  return axios.post(`${baseUrl_for_Employee}/Login`,employee);
 }

 checkUser(emailId)
{
  return axios.get(`${baseUrl_for_Admin}/check-user/${emailId}`);
}

changePassword(admin)
{
 return axios.post(`${baseUrl_For_Login}/change-password`,admin);
}

}

export default new LoginService