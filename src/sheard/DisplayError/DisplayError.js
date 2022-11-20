import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPovider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logOut()
        .then(()=>{
            navigate('/login')
        })
        .catch(error=>console.log(error))
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <button><Link to='' onClick={handleLogout}>Sign Out</Link></button>
        </div>
    );
};

export default DisplayError;