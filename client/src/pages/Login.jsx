import React, {useState, useContext, useEffect} from 'react';
import test from '../images/lines.jpg';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../css/index.css';
import '../css/styles.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';


import {ClientContext} from '../context/clientContext';



const Login = () => {

  useEffect( () => {document.body.style.backgroundImage =`url("https://transparenttextures.com/patterns/french-stucco.png")`})

  const [clientData, setClientData] = useState ({

    email:'',
    password:'',

  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const {setCurrentClient} = useContext(ClientContext)


  const changeInputHandler = (e) => {

    setClientData (prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })

  }

  const loginClient = async(e) => {
    e.preventDefault();
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/clients/login`, clientData)
      const client = await response.data;
      setCurrentClient(client)
      navigate('/')
      //document.getElementById('loggedInContent').style.display = 'block'; 
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  

  
  
  return (
  <MDBContainer fluid>
  <MDBRow>
  <MDBCol sm='6' className='d-none d-sm-block px-0'>
  <img className='bg-image' src={test} alt="Register Logo" height='950' class="w-200"
       style={{objectFit: 'cover', objectPosition: 'right'}} />
             </MDBCol>
  
  <MDBCol sm='6'>
    
  
  
  <section className="login">
  <div  className="container">
    <h1>Project HOW</h1>
    <br></br>
    <h4><span class="HOW" ><strong>H</strong></span>ulle weet wat <span class="HOW"><strong>O</strong></span>ns <span class="HOW"><strong>W</strong></span>eet!</h4>
    <form className="form login_form" onSubmit={loginClient}>
    {error && <p className="form_error_message">{error}</p>}
  
     <input type="text" placeholder="Your email please" name='email' value={clientData.email} 
    onChange={changeInputHandler} autoFocus />
      <input type="password" placeholder="Your Password" name='password' value={clientData.password} 
    onChange={changeInputHandler}/>
  
    <button type='submit' className="btn primary">Login</button>
    </form>
    {/*<small>Don't hanve an account yet? <Link to="/register">Sign Up!</Link></small>*/}
  </div>
  </section>
  
        </MDBCol>
  
      </MDBRow>
  
    </MDBContainer>
  );
  }
  
  export default Login;