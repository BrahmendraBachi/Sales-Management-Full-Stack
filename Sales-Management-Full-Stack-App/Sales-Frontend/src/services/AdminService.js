import React from 'react'
import axios from 'axios'

const baseUrl_For_Admin = "http://localhost:8080/Admin";

class AdminService
{
 getAdminById(id)
 {
  return axios.get(`${baseUrl_For_Admin}/${id}`);
 }

 getAllEmployees()
 {
  return axios.get(`${baseUrl_For_Admin}/getAllEmployees`);
 }

 deleteEmployee(id)
 {
  return axios.delete(`${baseUrl_For_Admin}/deleteEmployee/${id}`);
 }

 getAllZones()
 {
  return axios.get(`${baseUrl_For_Admin}/getAllZones`);
 }

 AddEmployee(employee)
 {
  return axios.post(`${baseUrl_For_Admin}/AddEmployee`,employee);
 }

 getCommisionModels()
 {
  return axios.get(`${baseUrl_For_Admin}/CommisionModels`);
 }

 getCommisionModelById(id)
 {
  return axios.get(`${baseUrl_For_Admin}/commision-model/${id}`);
 }

 updateCommisionModel(id, commisionModel)
 {
  return axios.put(`${baseUrl_For_Admin}/update-commision-model/${id}`, commisionModel);
 }

 getTotalSales()
 {
    return axios.get(`${baseUrl_For_Admin}/total-sales`);
 }

 getProductSoldinMonth(str)
 {
   return axios.get(`${baseUrl_For_Admin}/productsoldByMonth/${str}`);
 }

 getTotalSalesInMonth(date)
 {
   return axios.get(`${baseUrl_For_Admin}/total-sales-in-month/${date}`);
 }
 getApprovalRequests()
 {
   return axios.get(`${baseUrl_For_Admin}/get-pending-requests`);
 }

 DeleteRequest(pId)
 {
  return axios.delete(`${baseUrl_For_Admin}/delete-request-byId/${pId}`);
 }

 ApproveRequest(pId)
 {
  return axios.put(`${baseUrl_For_Admin}/approve-request-by-Id/${pId}`)
 }

 approveAllPendingRequests()
 {
  return axios.put(`${baseUrl_For_Admin}/approve-all-pending-requests`)
 }

 uploadCSV(file){
  const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
 return axios.post(`${baseUrl_For_Admin}/product-sold-data/upload`, file, config);
}

}

export default new AdminService;