import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiEditBoxFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import {ClientContext} from '../context/clientContext';
import axios from 'axios';

const ClientProfile = () => {
  const [avatar, setAvatar] = useState ('')
  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [currentPassword, setCurrentPassword] = useState ('')
  const [newPassword, setNewPassword] = useState ('')
  const [newConfirmNewPassword, setNewConfirmNewPassword] = useState ('')
  const [error, setError] = useState('')

  const[isAvatarTouched, setIsAvatarTouched] = useState(false)
  const navigate = useNavigate();

  const {currentClient} =useContext(ClientContext)
  const token = currentClient.token;
  
  //redirect to login page for any user that is not logged in
  
  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [])

  useEffect( () => {
    const getClient = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/clients/${currentClient.id}`, 
      {withCredentials: true, headers: {Authorization: `Bearer${token}`}})
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getClient();
  }, [])

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData ();
      postData.set('avatar', avatar);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/clients/change-avatar`, postData, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    } catch (error) {
       console.log(error)
    }
  }

   const updateClientDetails  = async (e) => {
   e.preventDefault();
   try{
    const clientData = new FormData ();
   clientData.set('name', name)
   clientData.set('email', email)
   clientData.set('currentPassword', currentPassword)
   clientData.set('newPassword', newPassword)
   
  const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/clients/edit-client`, clientData, 
  {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
  if(response.status === 200) {
    // log user out//
    navigate('/logout')
  }
} catch (error) {
  setError(error.response.data.message);
}
  }
  

return (
<section className="profile">
  <div className="container profile_container">
    <div className="profile_details">
    <div className="avatar_wrapper">
      <div className="profile_avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt=""/>
       </div>
       {/* Form to update avatar */}
       <form className='avatar_form' onSubmit={updateClientDetails}>
        <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} 
        accept="png, jpg, jpeg"/>
       <label htmlFor="avatar" onClick ={() => setIsAvatarTouched(true)}><RiEditBoxFill /></label>
       </form>
       {isAvatarTouched && <button className="profile_avatar-btn" onClick={changeAvatarHandler}><FaCheckCircle /></button>}
       </div>
      
      {/* Form to update user details */}
      {/*<Link to={`/myposts/${currentAuthor.id}`} className="btn"><h5>BLOCKS</h5></Link>  Written by:*/}
      <p className="userName">{currentClient.name}</p>
      <form className="form profile_form" onSubmit={updateClientDetails}>
      {error && <p className="form_error-message"> {error}</p>}
      <input type ="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}/>
      <input type ="mail" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type ="password" placeholder="Your Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
      <input type ="password" placeholder="Your New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
      <input type ="password" placeholder="Confirm New Password" value={newConfirmNewPassword} onChange={e => setNewConfirmNewPassword(e.target.value)}/>
      <button type="submit" className="btn primary">Update Details</button>
      </form>
    </div>
</div>


</section>

    );
}

export default ClientProfile;