import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminService from '../services/AdminService';
import LogOut from './LogOut';
import AdminHome from './AdminHome';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const CommisionModel = () => {

 var {id} = useParams();
 const [commisionModels, setCommisionModels] = useState([]);

 useEffect(() => {
  AdminService.getCommisionModels().then((response)=>{
   setCommisionModels(response.data);
  })

 }, [])

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
            <h2 className = "text-center text-primary"> Commision Model </h2>
            <div className='p-1'></div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Id </th>
                    <th> Cost Range </th>
                    <th> typeId </th>
                    <th> Commision </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        commisionModels.map(
                            commisionModel =>
                            <tr key = {commisionModel.id}> 
                                <td> {commisionModel.id} </td>
                                <td> {commisionModel.costRange} </td>
                                <td> {commisionModel.typeId} </td>
                                <td> {commisionModel.commision} </td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-commision/${commisionModel.id+"u"+id}`} >Update</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='text-center'>
                <Link to={`/Admin/${id}`} className="btn btn-info">Back to Admin Page</Link>
            </div>
            <div className='p-5'></div>
        </div>
      </div>
  )
}

export default CommisionModel
