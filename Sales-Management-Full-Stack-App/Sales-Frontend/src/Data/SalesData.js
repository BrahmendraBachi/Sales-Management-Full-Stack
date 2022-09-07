import { useState } from "react"
import AdminService from "../services/AdminService"

const SalesData =()=>{
 var sales;
 const [totalSales, setTotalSales] = useState([])
 AdminService.getTotalSales().then((response)=>{
  console.log("Sales Data:" + response.data)
  return response.data;
 })
}
export default SalesData;