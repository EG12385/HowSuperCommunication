import { createContext, useEffect, useState} from "react";


export const ClientContext = createContext();

    const ClientProvider = ({children}) => {
        const [currentClient, setCurrentClient] = useState(JSON.parse(localStorage.getItem
            ('client')))

        useEffect( () =>{
            localStorage.setItem('client', JSON.stringify(currentClient))
        }, [currentClient])

        return <ClientContext.Provider value={{currentClient, setCurrentClient}}>{children}</ClientContext.Provider>

    }


    

    export default ClientProvider;

   

