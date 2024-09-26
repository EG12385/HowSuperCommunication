import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
//import Layout from './componants/Layout';
//import ErrorPage from './pages/ErrorPage';
//import Home from './pages/Home';
//import Register from './pages/Register';
//import Login from './pages/Login';
//import ClientProfile from "./pages/ClientProfile";
//import Team from "./pages/Team";


import './css/index.css';
import './css/styles.css';
import { preloadImages } from './js/utils';
import { Panel } from './js/panel';
import Cursor from './js/cursor';
import ClientProvider from './context/clientContext';

const router = createBrowserRouter([
    {
     path: "/",
     //element: <ClientProvider><Layout/></ClientProvider>,
     //errorElement: <ErrorPage/>,
     //children : [
    // {index: true, element: <Home />},
     //{path: "/register", element: <Register />},
     //{path: "/login", element: <Login />},
    // {path: "clients/profile/:id", element: <ClientProfile />},
     //{path: "/clients", element: <Team />},
    
     //{path: "profile/id", element: <UserProfile />},
     
    }  
])

const panels = [...document.querySelectorAll('.panel')];

// Preload all images
preloadImages().then(() => {
    // remove loader (loading class) 
    document.body.classList.remove('loading');
    panels.forEach(panel => new Panel(panel));

    // initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // mouse effects on all links and others
    [...document.querySelectorAll('a, .panel__item-imgwrap, button')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <React.StrictMode>

<RouterProvider router ={router}/>

</React.StrictMode>
);



