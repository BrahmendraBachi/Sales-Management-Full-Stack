import React, { useState } from 'react'
import AdminService from '../services/AdminService';
import LogOut from './LogOut';
import AdminHome from './AdminHome';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const UploadCSV = () => {
  const navigate = useNavigate();
  const {id} = useParams();

 const [filename, setFilename] = useState('');
 const [file, setFile] = useState();

 const uploadFile = (e)=>{
  e.preventDefault();

  const formData = new FormData();
  console.log(file);
  console.log(filename);
  formData.append("file", file);
  formData.append("productSoldData", filename);
  console.log("Formdata");
  console.log(formData);
  console.log(typeof formData);
  AdminService.uploadCSV(formData).then((response)=>{
    console.log(response.data);
    toast.success(response.data.message, {autoClose:2000});
    toast.loading("Redirecting to Home Page", {position: toast.POSITION.TOP_CENTER});
    timer();
  })
 }

 const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
      navigate(`/Admin/${id}`);
  }, 4000);
  return () => clearTimeout(timer);
  }
 const saveFile=(e)=>{
  console.log("files");
  console.log(e.target.files[0]);
  var dum = e.target.files[0];
  setFile(dum);
    setFilename(e.target.files[0].name);
    console.log("File is Triggered");
  }

  const gotoAdminHome=()=>{
  var id1 = id
  var adminId = {id1};
  return <AdminHome data={adminId} />
}

  return (
    <div>
      {
         gotoAdminHome()
      }
      <LogOut />
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-4 offset-md-3 offset-md-4">
                       {/* <h2 className = "text-center"> Add Employee </h2> */}
                       <h2 className='text-center'>Upload Sales Line Data</h2>
                        <div className = "card-body">
                            <form>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group files color">
                                          <br />
                                          <div className='text-center'>
                                            <input
                                              type="file"
                                              onChange = {(e) => {saveFile(e)}}
                                            >
                                            </input>
                                          </div>
                                          <br />
                                          <div className='text-center'>
                                            <button className='btn btn-success' onClick={(e)=>uploadFile(e)}>Upload</button>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

           </div>
    </div>
  )
}

export default UploadCSV
