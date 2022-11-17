import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvaillavalAppoitnment from './AvaillavalAppoitnment/AvaillavalAppoitnment';

const Appointment = () => {
    const [selectedDate, setSelectedDate]= useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            >
            
            
            </AppointmentBanner>
                
            <AvaillavalAppoitnment
                selectedDate={selectedDate}
            >
            
            </AvaillavalAppoitnment>
            
            
        </div>
    );
};

export default Appointment;