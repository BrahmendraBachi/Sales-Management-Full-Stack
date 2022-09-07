import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import ProductService from '../services/ProductService';
import '../App.css';
import ProductTypeServices from '../services/ProductTypeServices';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSoldService from '../services/ProductSoldService';
import LogOut from './LogOut';
import AdminHome from './AdminHome';
import EmployeeHome from './EmployeeHome';



toast.configure();

const Products = () => {
  var {id} = useParams();
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([])
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductTypes();
    getAllProducts();
  }, [])
  
  const getAllProducts=()=>{
    ProductService.getAllProducts().then((response)=>{
      setProducts(response.data);
    }).catch(error=>{
      console.log(error)

    })
  }

  const ispopup=(id)=>{
  if(popup)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setPopup(false)}>x</button>
          <h3 className='text-danger'>Would you really want to delete employee?</h3>
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
            <button className='btn btn-success' onClick={()=>{deleteProduct(id)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setPopup(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
}

  const employeeORAdmin=(id1)=>{
    if(id.length==1)
    {
      return <button className = "btn btn-danger" onClick = {() => setPopup(true)}>Delete Product</button>
    }
    else{
      return <button className = "btn btn-danger" onClick = {() => sellProduct(id1)}>Sell Product</button>
    }
  }

  const sellProduct=(id1)=>{
    var ind = id.indexOf('e')
    var eId = id.slice(0,ind)
    var dum = {"pId" : id1, "eId" : eId}
    console.log(dum.pId+" "+dum.eId);
    ProductSoldService.sellProduct(dum).then((response)=>{
      console.log(response.data);
      toast.success("Product sold successfully");
    }).cacth(error=>{
      console.log(error);
      toast.error("Oops!!! Runtime error has occured, Product was not sold");
    })
  }

  const edit=(id2)=>{
    if(id.length==1)
    {
      console.log("Success");
      return <Link className="btn btn-info" to={`/edit-product/${id2+"u"+id}`} > Edit Details </Link>
    }
  }

  const deleteProduct=(id1)=>{
    ProductService.deleteProductById(id1).then((response)=>{
      toast.success("Product Deleted Successfully");
      setPopup(false);
      getAllProducts();
    }).catch(error=>{
      toast.error("Some Internal Error has occured");
      console.log(error);
    })
  }

  const getAllProductTypes=()=>
  {
    ProductTypeServices.getAllProductTypes().then((response)=>{
      setProductTypes(response.data);
      console.log("Response Data:"+response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const type=(typeId)=>
  {
    for(var i=0;i<productTypes.length;i++)
    {
      var Type = productTypes[i];
      if(typeId===Type.typeId)
      {
        return <strong>{Type.type}</strong>;
      }
    }
  }
  const cost=(value)=>{
  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
    })
    return <strong className='text-danger'> {formatter.format(value)}<i className="fa-solid fa-circle-check"></i></strong>
  }
  const isAddProduct=()=>{
    if(id.length == 1)
    {
      return <Link to = {`/add-product/${id}`} className = "btn btn-info mb-2" >
        <div className='strong'> Add Product </div></Link>
    }
  }

  const backToAdminOREmployeePage=()=>{
    if(id.length==1)
    {
      return <Link to={`/Admin/${id}`} className="btn btn-info">Back to Admin Page</Link>
    }
    else{
      var dum = id.indexOf('e'); 
      var myId = id.slice(0,dum);
      return <Link to={`/Employee/${myId}`} className="btn btn-info">Back to Employee Page</Link>
    }
  }

  const isAdminOrSalesPerson=()=>{
    if(/^[0-9]+$/.test(id))
    {
      var id1 = id
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
  <div >
    {
      isAdminOrSalesPerson()
    }
    <LogOut />
  <div className="container">
    <h3 className='text-center text-warning'>All Products</h3>
    <div className="container">
      <div className="row my-3">
        <div className="col-3 my-3">
          {
            isAddProduct()
          }
          {
            products.map(
              product => (
                  <div key={product.id} className="ex3">
                    <img class="img" src={product.imageUrl} alt="Card image cap"/>
                    <div class="row mx-1 mt-2">
                      <div class="col mx-1 mt-2">
                        <div className='container-title'>
                          <strong className='text-warning'>${product.modelName}</strong>
                          <p />
                          {
                            type(product.typeId)
                          }
                          <br />
                          <p />
                          {
                            cost(product.cost)
                          }
                          <p />
                          <p />
                          <p>{product.description}</p>
                          <p />
                          <p />
                          {
                            employeeORAdmin(product.id)
                          }
                          {
                            ispopup(product.id)
                          }
                          {
                            edit(product.id)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              )
            }
        </div>
      </div>
    </div>
    <div className='text-center'>
    {
      backToAdminOREmployeePage()
    }
    </div>
    <p />
    <p />
    <div className='p-5'>
      <p />
    </div>
  </div>
  </div>
  )
}

export default Products