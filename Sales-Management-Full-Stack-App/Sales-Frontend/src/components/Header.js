import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'


const Header = () => {
  return (
    <div>
     <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <div>
            <h1 className="navbar-brand text-light">Sales Management System</h1>
          </div>
          <div>
            <ul class="navbar-nav me-auto mb-2">
              <li clasName="nav-item"><Link to={`/Login/${"admin"}`} className='btn btn-dark text-light'>Admin</Link>
              </li>
              <div className='p-1'></div>
              <li className="nav-item"><Link to={`/Login/${"employee"}`} className='btn btn-dark text-light'>Employee</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     </header>
    </div>
  )
}
export default Header