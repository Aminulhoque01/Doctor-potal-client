import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import { AuthContext } from '../../../contexts/AuthPovider/AuthProvider';

const BookingModal = ({refetch, treatment, selectedDate, setTreatment }) => {
    const { name: treatmentName, slots } = treatment;
    const date = format(selectedDate, 'pp');
    const { user } = useContext(AuthContext);


    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3,4,5].map((value, i)=> console.log(value))

        const booking = {

            appointmentDate: date,
           treatment: treatmentName,
           patient:name,
           slot,
           email,
            phone,
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed');
                    refetch();
                }else{
                    toast.error(data.message);
                }
            })



    }
    return (
        <div>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking}>
                        <h3 className="text-lg font-bold">{treatmentName}!</h3>
                        <input type="text" disabled value={date} className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full">

                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered pt-5" />
                        <br />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Your Email" className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Your Phone" className="input w-full input-bordered" />
                        <br />
                        <br />
                        <input className='btn btn-accent w-full max-w-xs' type="submit" />
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;