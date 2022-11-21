import { createBrowserRouter } from "react-router-dom";
import DashboardLaout from "../../layOut/Main/DashboardLaout";
import Main from "../../layOut/Main/Main";
import MyAppointment from "../../layOut/MyAppointment/MyAppointment";

import Appointment from "../../pages/Appointment/Appointment";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import AllUser from "../../pages/Dashboard/AllUser/AllUser";
import ManageDoctor from "../../pages/Dashboard/ManegeDoctor/ManageDoctor";
import Payment from "../../pages/Dashboard/Payment/Payment";


import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import DisplayError from "../../sheard/DisplayError/DisplayError";
import AdminRout from "../AdminRoutes/AdminRout";
import PrivetRout from "../PrivetRoutes/PrivetRout";

export const  router= createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<DisplayError></DisplayError>,
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
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment/>
            },
            {
                path:'/dashboard/users',
                element:<AdminRout><AllUser></AllUser></AdminRout>,
            },
            {
                path:'/dashboard/add_doctor',
                element:<AdminRout><AddDoctor></AddDoctor></AdminRout>,
            },
            {
                path:'/dashboard/manage_doctor',
                element:<AdminRout><ManageDoctor></ManageDoctor></AdminRout>,
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=> fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    },
])