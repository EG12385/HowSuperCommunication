import React, {useContext} from 'react';
import {Outlet, Link} from 'react-router-dom';

//import Menu from './Menu';
//import PageTop from './PageTop';
//import Footer from './Footer';
import { ClientContext } from '../context/clientContext';

const Layout = () => {
    const {currentClient} = useContext(ClientContext)
    return (
<>
{!currentClient && <Link to="/login"></Link>}

  
  <Outlet />




   </>
        
    )
}

export default Layout;