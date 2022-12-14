import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPovider/AuthProvider';
import UseAdmin from '../../hooks/UseAdmin';
import NaveBar from '../../sheard/Navebar/NaveBar';

const DashboardLaout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin]= UseAdmin(user?.email)
    return (
        <div>
            <NaveBar></NaveBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-brawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-brawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                     
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        {
                            isAdmin &&<>
                                <li><Link to='/dashboard/users'>All users</Link></li>
                                <li><Link to='/dashboard/add_doctor'>Add Doctor</Link></li>
                                <li><Link to='/dashboard/manage_doctor'>manage Doctor</Link></li>
                            </>
                        }
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLaout;