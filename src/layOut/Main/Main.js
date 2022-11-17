import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../sheard/Footer/Footer';
import NaveBar from '../../sheard/Navebar/NaveBar';

const Main = () => {
    return (
        <div>
            <NaveBar/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default Main;