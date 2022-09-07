import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ZoneService from '../services/ZoneService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CanceledError } from 'axios';
import LogOut from './LogOut';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddZone = () => {
 
 const [zoneId, setZoneId] = useState('');
 const [city, setCity] = useState('');
 const [tarMonQuota, setTarMonQuota] = useState('');
 const naviagte = useNavigate();
 const [errors, setErrors] = useState({});
 var {id} = useParams();
 var id1, id2;
 if(isNaN(id))
 {
    var dum = id.indexOf("u");
    id1 = id.slice(0,dum);
    id2 = id.slice(dum+1, id.length);
 }


 useEffect(() => {
   if(isNaN(id))
   {
    ZoneService.getZoneById(id1).then((response)=>{
     console.log(response.data.zoneId+" "+response.data.city+response.data.tarMonQuota);
     setZoneId(response.data.zoneId);
     setCity(response.data.city);
     setTarMonQuota(response.data.tarMonQuota);
    }).catch(error=>{
        toast.error("Some internal error has occured");
    })
   }
 }, [])

 const saveORupdate=()=>{
  if(isNaN(id))
  {
   return <button className = "btn btn-success" onClick = {(e) => updateZone(e)} > Update </button>
  }
  else{
   return <button className = "btn btn-success" onClick = {(e) => saveZone(e)} > Add </button>
  }
 }

 const cancelToast=()=>{
    if(/^[0-9]+$/.test(id)==false)
    {
        toast.success("Update Zone cancelled successfully");
    }
    else{
        toast.success("Adding new zone cancelled Successfully");
    }
 }

 const Cancel=()=>{
  if(isNaN(id))
  {
   return <Link to={`/Zones/${id2}`} className="btn btn-danger" onClick={()=>{cancelToast()}}> Cancel </Link>
  }
  else{
   return <Link to={`/Zones/${id}`} className="btn btn-danger" onClick={()=>{cancelToast()}}> Cancel </Link>
  }
 }

 const updateZone=(e)=>{
  e.preventDefault();
  var zone1 = {zoneId, city, tarMonQuota}
  console.log("Zone Update "+ zone1.city);
  ZoneService.updateZone(zone1, id1).then((repsonse)=>{
    toast.success("Zone details updated Successfully");
   naviagte(`/Zones/${id2}`);
  }).catch(error=>{
   console.log(error);
   toast.error("Some internal error has occured");
  })
 }
 
 const title=()=>{
  if(isNaN(id))
  {
   return <h2 className = "text-center"> Update Zone </h2> 
  }
  else{
   return <h2 className = "text-center"> Add Zone </h2>
  }
 }

 const saveZone=(e)=>{
  e.preventDefault();
  var Zone = {zoneId, city, tarMonQuota};
  var dum = {};
  var count = 0;
  for(let i in Zone)
  {
    if(Zone[i].length==0)
    {
        count++;
        dum[i] = "*** This field is required ***";
    }
  }
  if(count==0)
  {
     newZone(Zone);
  }
  else{
    console.log("Set Errors is triggered");
    console.log(dum);
    setErrors(dum);
  }
 }

 const newZone=(zone)=>{
  ZoneService.AddZone(zone).then((response)=>{
    toast.success("New zone has added successfully");
   naviagte(`/Zones/${id}`)
  }).catch(error=>{
   console.log(error);
   toast.error("Some internal error has occured");
  })
 }

  return (
    <div>
        <LogOut />
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Zone Id: </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Zone Id"
                                        name = "zoneId"
                                        className = "form-control"
                                        value = {zoneId}
                                        onChange = {(e) => setZoneId(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.zoneId}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> City </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter city name"
                                        name = "city"
                                        className = "form-control"
                                        value = {city}
                                        onChange = {(e) => setCity(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.city}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Target Monthly Quota</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Target Montly Quota"
                                        name = "tarMonQuota"
                                        className = "form-control"
                                        value = {tarMonQuota}
                                        onChange = {(e) => setTarMonQuota(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.tarMonQuota}</small>
                                </div>
                                {
                                 saveORupdate()
                                }
                                {
                                 Cancel()
                                }
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
}

export default AddZone