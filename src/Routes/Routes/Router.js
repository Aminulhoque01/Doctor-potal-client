import { createBrowserRouter } from "react-router-dom";
import DashboardLaout from "../../layOut/Main/DashboardLaout";
import Main from "../../layOut/Main/Main";
import MyAppointment from "../../layOut/MyAppointment/MyAppointment";
import AllUser from "../../pages/AllUser/AllUser";
import Appointment from "../../pages/Appointment/Appointment";

import Dashboard from "../../pages/Dashboard/Dashboard";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import PrivetRout from "../PrivetRoutes/PrivetRout";

export const  router= createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            
            },
            {
                path:'/login',
                element:<Login></Login>
            },
         
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/appointment',
                element:<Appointment/>
            },

        ]
    },
    {
        path:'/dashboard',
        element:<PrivetRout><DashboardLaout></DashboardLaout></PrivetRout>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment/>
            },
            {
                path:'/dashboard/users',
                element:<AllUser></AllUser>,
            }
        ]
    },
])