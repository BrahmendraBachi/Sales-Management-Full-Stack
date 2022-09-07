import React, { useEffect, useState } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import ProductService from '../services/ProductService';
import ProductTypeServices from '../services/ProductTypeServices';
import LogOut from './LogOut';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddProduct = () => {

  const [productTypes, setProductTypes] = useState([])
  const [model, setModel] = useState('');
  const [modelName, setModelName] = useState('');
  const [cost, setCost] = useState('');
  const [typeId, setTypeId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const [errors, setErrors] = useState('');

  var id1, id2;
  if(/^[0-9]+$/.test(id)==false)
  {
    var dum = id.indexOf('u');
    id1 = id.slice(0, dum);
    id2 = id.slice(dum+1, id.length);
  }

  useEffect(() => {
    ProductTypeServices.getAllProductTypes().then((response)=>{
    setProductTypes(response.data);
   }).catch(error=>{
    console.log(error);
   })
   if(/^[0-9]+$/.test(id)==false)
   {
    ProductService.getProductById(id1).then((response)=>{
     setModel(response.data.model);
     setModelName(response.data.modelName);
     setTypeId(response.data.typeId);
     setCost(response.data.cost);
     setImageUrl(response.data.imageUrl);
     setDescription(response.data.description);
    }).catch(error=>{
     console.log(error);
    })
   }
  }, [])

  var options = []
  for(let i=0;i<productTypes.length;i++)
  {
    var dum = {}
    dum["label"] = productTypes[i].type;
    dum["value"] = productTypes[i].typeId;
    options.push(dum);
  }

  const title=()=>{
   if(/^[0-9]+$/.test(id)==false)
   {
    return <h2 className = "text-center"> Update Product Details </h2>
   }
   else{
    return <h2 className = "text-center"> New Product Details </h2> 
   }
  }

  const addORUpdate=()=>{
   if(/^[0-9]+$/.test(id)==false)
   {
    return <button className = "btn btn-success" onClick = {(e) => updateProduct(e)} > Update </button>
   }
   else{
    return <button className = "btn btn-success" onClick = {(e) => saveProduct(e)} > Add </button>
   }
  }

  const updateProduct=(e)=>{
   e.preventDefault();
   var product = {model, modelName, typeId, cost, imageUrl, description};
   ProductService.updateProduct(id1, product).then((response)=>{
    toast.success("Product updated successfully");
    navigate(`/Products/${id2}`);
   }).catch(error=>{
    console.log(error);
    toast.error("Some internal error has occured");
   })
  }

  const saveProduct=(e)=>{
   e.preventDefault();
   var product = {model, modelName, typeId, cost, imageUrl, description};
   var count = 0;
   var dum = {};
   for(let i in product)
   {
    if(product[i].length == 0)
    {
        count++;
        dum[i] = "*** This field is required ***";
    }
   }
   
   if(count==0)
   {
    AddNewProduct(product);
   }
   else{
    setErrors(dum);
   }
   
  }

  const AddNewProduct=(newProduct)=>{
    ProductService.AddProduct(newProduct).then((response)=>{
    toast.success("New product added successfully");
    navigate(`/Products/${id}`);
   }).catch(error=>{
    console.log(error);
    toast.error("Some internal error has occured");
   })
  }
  const cancelToast=()=>{
    if(/^[0-9]+$/.test(id)==false)
    {
        toast.success("Update Cancelled Successfully");
    }
    else{
        toast.success("Adding new product cancelled successfully");
    }
  }

  const Cancel=()=>{
   if(/^[0-9]+$/.test(id)==false)
   {
    return <Link to={`/Products/${id1}`} className="btn btn-danger" onClick={()=>{cancelToast()}}> Cancel </Link>
   }
   else{
    return <Link to={`/Products/${id}`} className="btn btn-danger" onClick={()=>{cancelToast()}}> Cancel </Link>
   }
  }

  return (
    <div>
        <LogOut />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {/* <h2 className = "text-center"> Add Employee </h2> */}
                       {
                        title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Model </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Model"
                                        name = "model"
                                        className = "form-control"
                                        value = {model}
                                        onChange = {(e) => setModel(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.model}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Model Name:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Model Name"
                                        name = "modelName"
                                        className = "form-control"
                                        value = {modelName}
                                        onChange = {(e) => setModelName(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.modelName}</small>
                                </div>

                                <br />
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Select Type: </label>
                                    <select className='text-align-center' onChange={(e)=>{

                                     setTypeId(e.target.value);

                                    }}>
                                     {options.map((option) => (<option value={option.value}>{option.label}</option>))}
                                    </select>
                                    <small className='text-danger'>{errors.typeId}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Cost : </label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter your Cost"
                                        name = "cost"
                                        className = "form-control"
                                        value = {cost}
                                        onChange = {(e) => setCost(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.cost}</small>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Image Url:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Image Url: "
                                        name = "imageUrl"
                                        className = "form-control"
                                        value = {imageUrl}
                                        onChange = {(e) => setImageUrl(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.imageUrl}</small>
                                </div>


                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Description: </label>
                                    <textarea
                                        type = "text"
                                        rows={5}
                                        placeholder = "Type Description"
                                        name = "description"
                                        className = "form-control"
                                        value = {description}
                                        onChange = {(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>
                                    <small className='text-danger'>{errors.description}</small>
                                </div>

                                {
                                    addORUpdate()
                                }
                                {
                                    Cancel()
                                }
                            </form>
                        </div>
                    </div>
                </div>

           </div>
           <br />
           <br />
        </div>
  )
}

export default AddProduct
