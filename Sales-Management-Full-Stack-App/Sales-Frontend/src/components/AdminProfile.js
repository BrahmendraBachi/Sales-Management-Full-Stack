import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminService from '../services/AdminService';

const AdminProfile = ({data}) => {

 const [id, setId] = useState(data.id1)
 const [name, setName] = useState('');
 const [adminId, setAdminId] = useState('');
 const [emailId, setEmailId] = useState('');
 var profilePicture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAMFBMVEXk5ueutLfGycvn6eqrsbS0ubzV2NqnrbHh4+S/w8bS1dfCxsm7wMO3vL/IzM7N0dMI2KZsAAADPElEQVR4nO2b247jIAxAIQZCLjT//7cLaaftdpJiu7WT1XKklUbahznCNgGbMabRaDQajUaj0Wg0Go3Gfw5A/nf/6XAA4thNc0ppHi4hHuwEJsyuYAvrD104zgnMxd9cHjiXxmOUss4vmyu9PWKVIPh+U2ddptloG0G3r7MGblQ1ApO2o/Wk1CkaQfQ1n2w0qBmhfNZE0hJC+WSjSWeNoJo/dyOVPIIO65ONgrwRhLf1/koUFzKe4iNfanDBB6zQSwctkgKWSbJClIy+IpzXkaiThbykECzUiGUjyUIDso7wfh2pGVTwcj7Umr8tUZATmhk+1l3kYsbxsXYWEwqciGWkfGDkCYkVPn2bvglJbdYwMIWkbiC8IstCy9mEpOoe0tmETrdCp8uh01XZ6fahs+3Up/uWMU7UK4IXD9ZGJHgeggtLSPDEyEsiMR/ercNK3jo4p3zRexmnzkRvrgamk93tGd0PUR36Eon3h6gdNLk72Q/n6zFSgqYQsIJF96mVOufYNFKbdgBue9SbdRQjxDRIvsCejOp5pJY/Pwzvq1/s6rMLhDdDKpfiAVPg2PU7U2k3qs+Ar0qmsxtze78c+JQghtQ/nJzr3RCOWZ2HE4RlmpP3Pg3dcvTbj5vSE4ebmBhDCMvKGEKM8Rit/CuzSTd7f30Uc30isyaTT9MSo+pjovXJ0Gz7naq3Lv9PGko+KTjl3zFO1u28i/m7/t08RuGSyyU1/H4y9MbJpkUudmBCh5d5SM0yO1NenIQ+Kr4oCezdOXMsfbr55HT56tcW3n7acUr2i0o5WB+szkPpS4GDONBTeVvJf+NWBIGXyptGn3f3wDCb5XtK9rNMQj7uIvHJYRvGLyTzK/3A92GN6auwL5AwCazPauRZiUTv3lGMTuVTio28RNxRFNaI+kKFO4nCG9FaNUButtKNaJs2qbPJNCJ82LjDVSJ4H+7kkAa+gwQKAStge7Scp3g8sLNPJR1sXgt9UjdBja60MqiAySLiLOMzMPu10h50A/HZZz4WYIIYoetsinehasyEjx2/qQop1lihr0UMlBeoXviKRV+oHYvyLuR0qf1xTJw6XcZqEilT82k0Go1G41/jD2n0KSSHkfO7AAAAAElFTkSuQmCC"


 useEffect(() => {
  console.log("Admin "+id);
        getAdminById(id);
    }, [])

 const getAdminById = (id) =>
{
 console.log("Admin is Triggered");
 AdminService.getAdminById(id).then((response)=>{
  setName(response.data.firstName+response.data.lastName);
  setAdminId(response.data.adminId);
  setEmailId(response.data.emailId);
  console.log(name+" "+adminId+" "+emailId);
 }).catch(error=>{
  console.log(error);
 })
}

  return (
    <div>
      <h3 className='text-center text-success'>Profile</h3>
     <div className="ex2">
      <div className="w3-display-left">
       <div className="card h-100">
        <div className="center">
         <img src={profilePicture} className="img1" />
        </div>
        <div class="container-title">
         <strong>Name: </strong> <strong className="text-primary">{name}</strong>
         <br />
         <strong>AdminId: </strong> <strong className='text-primary'>{adminId}</strong>
         <br />
         <strong>EmailId: </strong><strong className='text-primary'>{emailId}</strong>
        </div>
       </div>
      </div>
     </div>
    </div>
  )
}

export default AdminProfile
