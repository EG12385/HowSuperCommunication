import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'




const Clients = () => {

  const [clients, setClients] = useState([])


  useEffect(() => {
    const getClients = async () => {
     
      try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/clients`)
      setClients(response.data)
      } catch (error) {
        console.log(error)
      }
    
    }

    getClients();
  }, [])


    return (
  <section className="clients">
      {clients.length > 0 ? <div className="container clients_container">
        {
          clients.map(({_id: id, avatar, name})=> {
          return <Link key={id} to={`/clients/${id}`} className="clients">
            <div className="client_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={ ` ${name}`}/>
            </div>
            <div className="client_info">
              <h2>{name}</h2>

            </div>
          </Link>
        })
        }

    </div> : <h2 className="center">No Team Members Found</h2>}

  </section>
    )
}

export default Clients;