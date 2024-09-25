
import React, { useState, useContext, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/ictglobe.png';

//import {FaBars} from "react-icons/fa";
//mport {AiOutlineCloseSquare} from 'react-icons/ai';
import { ClientContext } from '../context/clientContext';
import axios from 'axios';
//import { RiLogoutBoxRFill } from "react-icons/ri";



import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";



initMDB({ Dropdown, Collapse });

const PageTop = () =>{
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
    const {currentClient} =useContext(ClientContext);
    const token = currentClient?.token;
    const navigate = useNavigate();
    
      

    const closeNavHandler = () => {
        if (window.innerWidth < 800){
            setIsNavShowing(false)
        } else {
            setIsNavShowing(true)
        }    
    }

  
        const [avatar, setAvatar] = useState ('avatar')
        const [name, setName] = useState ('')
        const [email, setEmail] = useState ('')
     
      
        //redirect to login page for any user that is not logged in
        
        useEffect(() => {
          if(!token) {
            navigate('/login');
            isNavShowing(false)
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

return (

<nav className="navbar navbar-expand-lg navbar-light ">

<Link to="/" className='nav_logo' onClick={closeNavHandler}><img className="nav_logo animate__animated animate__backInRight" src={Logo} /></Link>
  {!currentClient&& <Link to="/login"></Link>}

   

{!currentClient?.id && isNavShowing && <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
      <li className="nav-item  nav_title" >
      <p className="nav_title"><span className="thin">the</span> BLOCK</p>
      </li>
      <li><Link to="/login"  onClick={closeNavHandler}></Link>Login</li>
</ul>}

<div className="nav_container">

  <button
    data-mdb-collapse-init
    className="navbar-toggler"
    type="button"
    data-mdb-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <i className="fas fa-bars"></i>
  </button>


<div className="collapse navbar-collapse" id="navbarSupportedContent">

  
  

  </div>



  <div className="d-flex me-5 align-items-center">

  {currentClient?.id && isNavShowing && 

    <div className="dropdown" setOpenNavRigh>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
   
      <li className="nav-item">
      <a className="nav-link" ><Link to="/create" onClick={closeNavHandler}>BLOCK</Link></a>
      </li>
      <li className="nav-item">
      <a className="nav-link"><Link to="/clients" onClick={closeNavHandler}>Authors</Link></a>
      </li>
      <li className="nav-item">
      <a className="nav-link"><Link to='' onClick={closeNavHandler}>{currentClient.name}</Link></a>
      </li>

      <li>
      
      <Link to={`/profile/${currentClient.id}`} onClick={closeNavHandler}> <img  className="profile_menu" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="User"/> </Link>
  
       </li>

      <li className="nav-item">
      <Link to="/login" onClick={closeNavHandler} className="Logout" >Logout</Link>
      </li>

      </ul>
    </div>}


  </div>

</div>

</nav>
)

}


export default PageTop;