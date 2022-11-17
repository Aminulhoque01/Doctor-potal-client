import React from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../assets/images/chair.png'
import { format } from 'date-fns';

const AppointmentBanner = ({selectedDate,setSelectedDate} ) => {
   
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='mr-right'>
                        <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}

                        
                        />
                    <p>You have selected date:{format(selectedDate,'pp')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;