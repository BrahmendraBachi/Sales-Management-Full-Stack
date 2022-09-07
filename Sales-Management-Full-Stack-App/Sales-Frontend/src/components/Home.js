import React from 'react'
import { toast } from 'react-toastify'
import '../App.css';

const Home = () => {
  return (
    <div>
      <p />
      <div className='container'>
        <h2 className='text-center'> Vehicle Sales Management System </h2>
        <div className="ex4">
            <img class="img5" src="https://bit.ly/3RfWH69" alt="Card image cap"/>
            <div className='side-by-side'>
              <div className='container'>
                <h2 className='text-center text-warning'>Admin</h2>
                <div style={{left : 100}}>
                  <div className='text-info'>
                    <h5>
                    <ul>
                      <li> Sales Person(add, delete, update, view sales)</li>
                      <p />
                      <li>Zones(add, delete, update)</li>
                      <p />
                      <li>Vehicles(add, delete, update)</li>
                      <p />
                      <li>Vehicle Types(view)</li>
                      <p />
                      <li>CommisionModel(update)</li>
                      <p />
                      <li>View Vehicles Sales Data as Graph</li>
                      <p />
                      <li>Upload Sales Data</li>
                      <p />
                      <li>Approve Vehicle Sold data</li>
                      <p />
                    </ul>
                    </h5>
                  </div>
                </div>
              </div>
              <div className='container'>
                <h2 className='text-warning text-center'>Sales Person</h2>
                <div style={{left : 100}}>
                  <div className='text-info'>
                    <h5>
                     <ul>
                      <li>View his monthly Sales(with monthly commision)</li>
                      <p />
                      <li>Vehicle Types(view)</li>
                      <p />
                      <li>Vehicles(view)</li>
                      <p />
                      <li>Completed Target monthly Quota(as Pie Chart)</li>
                     </ul>
                    </h5>
                  </div>
                </div>
              </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home