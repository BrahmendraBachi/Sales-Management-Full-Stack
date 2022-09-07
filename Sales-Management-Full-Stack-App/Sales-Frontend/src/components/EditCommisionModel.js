import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminService from '../services/AdminService';
import LogOut from './LogOut';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const EditCommisionModel = () => {

 const {id} = useParams();
 const [costRange, setCostRange] = useState('');
 const [typeId, setTypeId] = useState('');
 const [commision, setCommision] = useState(0);
 const navigate = useNavigate();
 var ind = id.indexOf("u");
 var id1 = id.slice(0, ind);
 var id2 = id.slice(ind+1, id.length);

 useEffect(() => {
  AdminService.getCommisionModelById(id1).then((response)=>{
   setCostRange(response.data.costRange);
   setTypeId(response.data.typeId);
   setCommision(response.data.commision);
  }).catch(error=>{
   console.log(error);
  })
 }, [])
 
 const updateZone=(e)=>{
  e.preventDefault()
  var commisionModel = {costRange, typeId, commision};
  AdminService.updateCommisionModel(id1, commisionModel).then((response)=>{
    toast.success("Commision model updated successfully");
   navigate(`/commision-model/${id1}`)
  }).catch(error=>{
   console.log(error);
  })
 }

 const toastCancel=()=>{
    toast.success("Update commision model cancelled successfully");
 }
  return (
    <div>
        <LogOut />
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       <h2 className = "text-center text-primary"> Update Commision Model </h2>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Cost Range </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Cost Range Code"
                                        name = "costRange"
                                        className = "form-control"
                                        value = {costRange}
                                        onChange = {(e) => setCostRange(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Type Id </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Type Id"
                                        name = "typeId"
                                        className = "form-control"
                                        value = {typeId}
                                        onChange = {(e) => setTypeId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Commision (in %) </label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Target Montly Quota"
                                        name = "commision"
                                        className = "form-control"
                                        value = {commision}
                                        onChange = {(e) => setCommision(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className = "btn btn-success" onClick = {(e) => updateZone(e)} > Update </button>
                                <Link to={`/commision-model/${id2}`} className="btn btn-danger" onClick={()=>{toastCancel()}}> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
}

export default EditCommisionModel
