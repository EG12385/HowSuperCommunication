import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import sand from '../images/lines.jpg';
import background from '../images/lines.jpg';
import axios from 'axios';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput

}
from 'mdb-react-ui-kit';

const Register = () => {

    const [clientData, setClientData] = useState ({
      name:'',
      email:'',
      password:'',
      password2:''
  
    })
  
    useEffect( () => {document.body.style.backgroundImage =`url(${background})`})
  
    const changeInputHandler = (e) => {
  
      setClientData (prevState => {
        return {...prevState, [e.target.name]: e.target.value}
      })
  
    }
  
    const [error, setError] = useState ('')
    const navigate = useNavigate()
  
   const registerClient = async(e) => {
    e.preventDefault()
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/clients/register`, clientData)
      const newClient = await response.data;
      console.log(newClient);
      if(!newClient){
        setError("Registration failed... Please try again.")
      }
      navigate('/login')
    } catch (error) {
    setError(error.response.data.message)
   }
  }

 
  return (
  
 

    <section className="register ">

   <div >
    <MDBContainer >
     
      <div className="p-8 bg-image" style={{ height: '300px', width:'700px', class:'w-100'}}><img className='sand' src={sand} alt="Navbar Logo"/></div>

      <MDBCard className= 'mx-5 mb-5 p-5 shadow-5'  style={{marginTop: '-270px', background: 'hsla(0, 0%, 90%, 0.5)',backdropFilter: 'blur(5px)'}}>
        <MDBCardBody className='p-7 '>
          
          <h2 className="fw-bold mb-">Sign Up for Super Insights</h2>
          <form className="form register_form" onSubmit={registerClient}>
          {error && <p className="form_error_message">{error}</p>}
          <MDBRow>
            <MDBCol class="col-md-6 offset-md-3 align-self-center" >
              <MDBInput wrapperClass='mb-4' type='text' placeholder='User Name' name='name' id='form1'  value={clientData.name}
              onChange={changeInputHandler} style={{width: '100%'}} />
            </MDBCol> 
          </MDBRow>

          <MDBRow>
            <MDBCol class="col-md-6 offset-md-3 align-self-center" >
              <MDBInput wrapperClass='mb-4' type="text" placeholder="Business email please" name='email' value={clientData.email} 
             onChange={changeInputHandler}style={{width: '100%'}} />
            </MDBCol> 
          </MDBRow>

          <MDBRow>
            <MDBCol class="col-md-6 offset-md-3 align-self-center" >
              <MDBInput wrapperClass='mb-4' type="password" placeholder="Your Password" name='password' value={clientData.password} 
               onChange={changeInputHandler} style={{width: '100%'}}  />
            </MDBCol> 
          </MDBRow>

          <MDBRow>
            <MDBCol class="col-md-6 offset-md-3 align-self-center" >
              <MDBInput wrapperClass='mb-4' type="password" placeholder="Confirm Password" name='password2' value={clientData.password2} 
               onChange={changeInputHandler}style={{width: '100%'}} />
            </MDBCol> 
          </MDBRow>
         
         
          <MDBRow>
            <MDBCol class="col-md-6 offset-md-3 align-self-center" >
            <button type='submit' className="btn primary">Register</button>
            </MDBCol> 
          </MDBRow>
             

          



          </form>
          <p>Already Registerd? <Link to="/login">Login</Link></p>
        </MDBCardBody>
      </MDBCard>
       </MDBContainer>
       
       </div>
   

    </section>

  );
}

export default Register;