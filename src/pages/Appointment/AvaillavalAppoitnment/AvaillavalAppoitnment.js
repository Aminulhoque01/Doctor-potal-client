import { async } from '@firebase/util';
import { QueryClient, useQuery } from '@tanstack/react-query';
import  {format}  from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../../sheard/loading/Loading';
import AppoitnmentsOption from '../AppoinmentsOption/AppoitnmentsOption';
import BookingModal from '../BookingModal/BookingModal';

const AvaillavalAppoitnment = ({selectedDate}) => {
    // const [AppoitnmentsOptions, setAppointmentOptions]=useState([])

    const [treatment,setTreatment] = useState(null);
    const date = format(selectedDate,'pp');

    const {data:AppoitnmentsOptions=[],refetch, isLoading} = useQuery({
        queryKey:['AppoitnmentsOptions',date],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    // useEffect(()=>{
    //     fetch('http://localhost:5000/appointmentOptions')
    //     .then(res=>res.json())
    //     .then(data => setAppointmentOptions(data))
    // },[])


    return (
        <section className='my-16'>
            <p className='text-center text-primary font-bold'>Available Appointments on {format(selectedDate,'pp')}</p>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                  AppoitnmentsOptions.map(option=><AppoitnmentsOption 
                    key={option._id}
                    option={option}
                    setTreatment={setTreatment}
                    >

                    </AppoitnmentsOption>)  
                }
            </div>
            <div>
                {
                    treatment &&
                    <BookingModal 
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}>

                    </BookingModal>
                }
            </div>
        </section >
    );
};

export default AvaillavalAppoitnment;