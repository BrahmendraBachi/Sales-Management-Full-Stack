import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProductTypeServices from '../services/ProductTypeServices'
import LogOut from './LogOut'

const AddProductType = () => {
 const [type,setType] = useState('');
 const [typeId, setTypeId] = useState('');
 const navigate = useNavigate()
 var {id} = useParams();
 var id1, id2;
 if(isNaN(id))
 {
    var dum = id.indexOf("u");
    id1 = id.slice(0, dum);
    id2 = id.slice(dum+1, id.length);
 }

 useEffect(() => {
   getProductTypeById();
 }, [])

 const getProductTypeById=()=>{
  console.log("ProductTypeById");
  var id1 = id[0]
  ProductTypeServices.getProductTypeById(id1).then((response)=>{
   console.log(response.data.type + response.data.typeId)
   setType(response.data.type);
   setTypeId(response.data.typeId);
  }).catch(error=>{
   console.log(error);
  })
 }
 
 const title=()=>{
  if(id.length==1)
  {
   return <h2 className = "text-center"> Add Product Type </h2>
  }
  else{
   return <h2 className = "text-center"> Update Product Type </h2>
  }
 }

 const saveORupdate=()=>{
  if(id.length==1)
  {
   return <button className = "btn btn-success" onClick = {(e) => addProductType(e)} > Add </button>
  }
  else{
   return <button className = "btn btn-success" onClick = {(e) => updateProductType(e)} > Update </button>
  }
 }

 const updateProductType=(e)=>{
  e.preventDefault();

  var id2 = id[0];
  var id1 = id[1];
  var productType = {type, typeId}
  ProductTypeServices.UpdateProductTypeById(productType, id2).then((response)=>{
   navigate(`/Product-Types/${id}`);
  })

 }

 const addProductType=(e)=>{
  e.preventDefault();
  var particularType = {type, typeId};
  ProductTypeServices.AddProductType(particularType).then((response)=>{
   console.log(response.data);
   navigate(`/Product-Types/${id}`);
  }).catch(error=>{
   console.log(error);
  })
 }

 const Cancel=()=>{
  if(id.length == 1)
  {
   return <Link to={`/Product-Types/${id}`} className="btn btn-danger"> Cancel </Link>
  }
  else
  {
   var id1 = id[1];
   return <Link to={`/Product-Types/${id}`} className="btn btn-danger"> Cancel </Link>
  }
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
                                    <label className = "form-label"> Type </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Type"
                                        name = "type"
                                        className = "form-control"
                                        value = {type}
                                        onChange = {(e) => setType(e.target.value)}
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

export default AddProductType