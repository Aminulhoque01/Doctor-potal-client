import React, { useEffect, useState } from 'react';

const AppoitnmentsOption = ({ option,setTreatment }) => {
    const { name, slots } = option;

    return (
        <div className="card">
           
            <div className="card-body text-center">
                <h2 className="text-primary text-center text-2xl font-bold"> {name}</h2>
                <p>{slots.length > 0 ? slots[0]:'try another'}</p>
                <p>{slots.length }{slots.length > 1 ? 'spaces':'spaces'} Available</p>
                <div className="card-actions justify-center">
                   
                    
                    <label
                     htmlFor="my-modal-3" 
                     className="btn btn-primary"
                     onClick={()=>setTreatment(option)}>Book Appointment</label>
                    

                </div>
            </div>
        </div>
    );
};

export default AppoitnmentsOption;
