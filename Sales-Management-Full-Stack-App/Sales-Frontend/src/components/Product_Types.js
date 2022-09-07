import React from 'react'
import ProductTypeServices from '../services/ProductTypeServices'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LogOut from './LogOut'
import AdminHome from './AdminHome'
import EmployeeHome from './EmployeeHome'

const Product_Types = () => {
  const [productTypes,setProductTypes] = useState([])
  const {id} = useParams();
  useEffect(() => {
    getAllProductTypes()
  }, [])
  
  const getAllProductTypes=()=>{
    ProductTypeServices.getAllProductTypes().then((response)=>{
      setProductTypes(response.data);
    })
  }

  const adminOREmployeePage=()=>{
    if(/^[0-9]+$/.test(id))
    {
      return <Link to={`/Admin/${id}`} className="btn btn-info text-center">Back to Admin Page</Link>
    }
    else{
      var dum = id.indexOf('e'); 
      var myId = id.slice(0,dum);
      return <Link to={`/Employee/${myId}`} className="btn btn-info text-center">Back to Employee Page</Link>
    }
  }

  const isAdminorEmployee=()=>{
    if(/^[0-9]+$/.test(id))
    {
      var id1 = id;
      var adminId = {id1};
      return <AdminHome data={adminId} />   
    }
    else{
      var ind = id.indexOf("e");
      var id1 = id.slice(0, ind);
      var empId = {id1}
      return <EmployeeHome data={empId} />
    }
  }

  return (
    <div>
      {
        isAdminorEmployee()
      }
      <LogOut />
      <div className = "container">
            <h2 className = "text-center text-primary"> List Product Types </h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Id </th>
                    <th> Type </th>
                    <th> TypeId </th>
                </thead>
                <tbody>
                    {
                        productTypes.map(
                            productType =>
                            <tr key = {productType.id}> 
                                <td> {productType.id} </td>
                                <td> {productType.type} </td>
                                <td> {productType.typeId} </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='text-center'>
              {
                adminOREmployeePage()
              }
            </div>
        </div>
      </div>
  )
}

export default Product_Types