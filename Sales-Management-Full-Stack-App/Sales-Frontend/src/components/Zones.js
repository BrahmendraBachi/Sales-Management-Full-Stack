import React from 'react'
import ZoneService from "../services/ZoneService.js"
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService.js';
import AdminHome from './AdminHome.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Zones = () => {

  const [popup, setPopup] = useState(false)

  const [zones, setZones] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getAllZones();
  }, [])
  
  const getAllZones=()=>{
    ZoneService.getAllZones().then((response)=>{
      setZones(response.data);
    }).catch(error=>{
      console.log(error);
      toast.configure("Some internal error has occured");
    })
  }
  const deleteZone=(id1)=>{
    ZoneService.deleteZone(id1).then((response)=>{
      console.log(response.data);
      toast.success("Zone deleted Successfully");
      setPopup(false);
      getAllZones();
    }).catch(error=>{
      console.log(error);
      toast.configure("Some internal error has occured");
    })
  }

  const gotoAdminHomePage=()=>{
    var id1 = id;
    var adminId = {id1};
    return <AdminHome data={adminId} />  
  }

  const ispopup=(id)=>{
  if(popup)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setPopup(false)}>x</button>
          <h3 className='text-danger'>Would you really want to delete zone?</h3>
          <div className='side-by-side1'>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-2'></div>
            {/* <div className='p-1'></div>
            <div className='p-1'></div>
            <div className='p-2'></div>
            <div className='p-2'></div> */}
            <button className='btn btn-success' onClick={()=>{deleteZone(id)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setPopup(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
}

  return (
    <div>
      {
        gotoAdminHomePage()
      }
      <div className = "container">
            <h2 className = "text-center text-primary"> List Zones </h2>
            <Link to = {`/add-zone/${id}`} className = "btn btn-primary mb-2" > Add Zone </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Id </th>
                    <th> Zone Id </th>
                    <th> City </th>
                    <th> Target Monthly Quota </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        zones.map(
                            zone =>
                            <tr key = {zone.id}> 
                                <td> {zone.id} </td>
                                <td> {zone.zoneId} </td>
                                <td> {zone.city} </td>
                                <td> {zone.tarMonQuota} </td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-zone/${zone.id+"u"+id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => setPopup(true)}
                                    style = {{marginLeft:"10px"}}> Delete </button>
                                    {
                                      ispopup(zone.id)
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='text-center'>
                <Link to={`/Admin/${id}`} className="btn btn-info">Back to Admin Page</Link>
            </div>
        </div>
      </div>
  )
}
export default Zones