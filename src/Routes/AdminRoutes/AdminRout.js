import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPovider/AuthProvider';
import UseAdmin from '../../hooks/UseAdmin';
import Loading from '../../sheard/loading/Loading';

const AdminRout = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const [isAdmin , isAdminLoading]= UseAdmin(user?.email);
    console.log(isAdmin);

    const location = useLocation();

    if(loading || isAdminLoading){
        return <Loading></Loading>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{form:location} } replace></Navigate>;
};
export default AdminRout;