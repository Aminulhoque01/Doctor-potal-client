import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../sheard/ConfirmationModal/ConfirmationModal';
import Loading from '../../../sheard/loading/Loading';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor]= useState(null);

    const handelCancel=()=>{
        setDeletingDoctor(null);
    }

  
    const { data: doctors, isLoading,refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`

                    }
                });
                const data = await res.json();
                return data;
            }
            catch (err) {
                console.log(err);
            }
        }
    });

    const handleDeletingDoctor=(doctor)=>{
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method:'DELETE',
            headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount >0){

                refetch();
                toast.success(`Doctor ${doctor.name} deleted successful`)
            }

        })
        
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl'>Manage Doctor</h2>
            <div className=" grid  sm:grid-cols-12">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="w-24 rounded-full">
                                    <img src={doctor.image} alt='' />
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-outline btn-error">Delete</label>
                                    
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                title={`Are you sure you want to delete?`}
                message={`If you delete ${deletingDoctor.name} it can be undone`}
                handelCancel={handelCancel}
                successButtonName="Delete"
                handleDeletingDoctor={handleDeletingDoctor}
                modalData={deletingDoctor}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;