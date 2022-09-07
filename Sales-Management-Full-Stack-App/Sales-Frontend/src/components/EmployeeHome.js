import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const EmployeeHome = ({data}) => {
 const [id, setId] = useState(data.id1);

 const check=()=>{
  console.log("Id in Emplotee Home PAge:", id);
 }
  return (
    <div>
     {
      check()
     }
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <ul class="navbar-nav">
    <li>
      <a class="navbar-brand" routerLink="#"></a>
    </li>
    <li class="nav-item">
      <Link to={`/Product-Types/${id+"e"}`} className='btn btn-dark text-light'>Product Types</Link>
    </li>
    <li class="nav-item">
      <Link to={`/Products/${id+"e"}`} className='btn btn-dark text-light'>Products</Link>
    </li>
    <li class="nav-item">
      <Link to={`/product-sold/${id+"e"}`} className='btn btn-dark text-light'>Products Sold</Link>
    </li>
    <li class="nav-item">
      <Link to={`/sales-chart/${id+"e"}`} className='btn btn-dark text-light'>Sales Chart</Link>
    </li>
  </ul>
</nav>
    </div>
  )
}

export default EmployeeHome
