import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/ictglobe.png';
import {FaBars} from "react-icons/fa";
import {AiOutlineCloseSquare} from 'react-icons/ai';
import {ClientContext } from '../context/clientContext';



const Header = () =>{
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
    const {currentClient} = useContext(ClientContext)
    const navigate = useNavigate();



    const closeNavHandler = () => {
        if (window.innerWidth < 800){
            setIsNavShowing(false)
        } else {
            setIsNavShowing(true)
        }    
    }

    return (
   <nav>
        {!currentClient && <Link to="/login"></Link>}

   

{!currentClient?.id && isNavShowing && <ul className="nav_menu">
   
    <li>Please Login or Sign Up</li>
</ul>}
   <div className="container nav_container navbar-nav ms-auto mb-2 mb-lg-0">

   {currentClient?.id && isNavShowing &&<Link to="/" className='nav_logo' onClick={closeNavHandler}> 
   <img className="navigate_logo animate__animated animate__backInRight" src={Logo} />
       
         </Link>} <p className="navigate_title .animate__backInRight"><span className="thin"> the </span> BLOCK</p>

    {currentClient?.id && isNavShowing && <ul className="nav_menu">
 
        <li><Link to={`/profile/${currentClient.id}`} onClick={closeNavHandler}>{currentClient?.name}</Link></li>
        <li><Link to="" onClick={closeNavHandler}>Create Blog</Link></li>
        <li><Link to="" onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to="" onClick={closeNavHandler}>Logout</Link></li>
        <li><Link to="" onClick={closeNavHandler}>Start</Link></li>
    </ul>}

    <buttton className="nav_toggle-btn" onClick ={()=> setIsNavShowing(!isNavShowing)}>
    {isNavShowing ? <AiOutlineCloseSquare /> : <FaBars />}
    </buttton>




   </div>
    </nav>
    )
}


export default Header; 