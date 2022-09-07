import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AdminHome({data}) {
 const [id, setId] = useState(data.id1);
 useEffect(() => {
  console.log("id", id);
 }, [])

  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-info">
  <ul class="navbar-nav">
    <li>
      <a class="navbar-brand" routerLink="#"></a>
    </li>
    <li class="nav-item">
      <Link to={`/Employees/${id}`} className='btn btn-dark text-light'>Employees</Link>
    </li>
    <li class="nav-item">
      <Link to={`/Product-Types/${id}`} className='btn btn-dark text-light'>Product Types</Link>
    </li>
    <li class="nav-item">
      <Link to={`/Products/${id}`} className='btn btn-dark text-light'>Products</Link>
    </li>
    <li class="nav-item">
      <Link to={`/Zones/${id}`} className='btn btn-dark text-light'>Zones</Link>
    </li>
    <li class="nav-item">
      <Link to={`/product-sold/${id}`} className='btn btn-dark text-light'>Product Sold</Link>
    </li>
    <li class="nav-item">
      <Link to={`/commision-model/${id}`} className='btn btn-dark text-light'>Commision Model</Link>
    </li>
    <li class="nav-item">
      <Link to={`/sales-chart/${id}`} className='btn btn-dark text-light'>Total Sales</Link> 
    </li>
    <li class="nav-item">
      <Link to={`/approval-requests/${id}`} className='btn btn-dark text-light'>Approval Requests</Link> 
    </li>
    <li class="nav-item">
      <Link to={`/upload-csv/${id}`} className='btn btn-dark text-light'> Upload Sales Data </Link> 
    </li>
  </ul>
</nav>
    </div>
  )
}

export default AdminHome
