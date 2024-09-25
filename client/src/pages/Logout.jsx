import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import {ClientContext} from '../context/clientContext';



const Logout = () => {
  const {setCurrentClient} = useContext(ClientContext)
  const navigate = useNavigate();

  setCurrentClient(null)
  navigate('/')
    return (
  <></>
    )
}

export default Logout;