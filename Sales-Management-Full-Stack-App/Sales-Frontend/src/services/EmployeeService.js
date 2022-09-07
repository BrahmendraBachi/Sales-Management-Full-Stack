import React from 'react'
import axios from 'axios'

const baseUrl_For_Employee = "http://localhost:8080/Employee";

class EmployeeService
{
 getEmployeeById(id2)
 {
  return axios.get(`${baseUrl_For_Employee}/${id2}`);
 }

 updateEmployee(employee, id)
 {
  return axios.put(`${baseUrl_For_Employee}/updateEmployee/${id}`, employee);
 }

 deleteEmployeeByZoneId(zoneId)
 {
  return axios.delete(`${baseUrl_For_Employee}/deleteEmployees/${zoneId}`)
 }

 // myCommision(productsSold)
 // {
 //  return axios.post(`${baseUrl_For_Employee}/myTotalCommision/`, productsSold);
 // }

 getSalesById(id)
 {
  return axios.get(`${baseUrl_For_Employee}/sales-by-id/${id}`);
 }

 getEmployeeByEmpId(empId)
 {
  return axios.get(`${baseUrl_For_Employee}/getEmployeeDetails/${empId}`);
 } 

 getProductsSoldinMonthForEmployee(str)
 {
  console.log(str);
  return axios.get(`${baseUrl_For_Employee}/getSalesByMonth/${str}`);
 }

 getSalesForEmployeeInMonth(str)
 {
  console.log(str);
  return axios.get(`${baseUrl_For_Employee}/sales-by-id-in-month/${str}`);
 }

 getMonthlyQuota(id)
 {
  return axios.get(`${baseUrl_For_Employee}/dataTotalQuota/${id}`);
 }

}

export default new EmployeeService;
