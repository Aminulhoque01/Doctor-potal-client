import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../../sheard/loading/Loading';
import CheckoutForm from './CheckoutForm';
// import Loading from '../'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const bookings = useLoaderData();
    const navigation = useNavigation();
    if(navigation.state === "loading"){
        return <Loading></Loading>
    }


    return (
        <div>
            <h2 className='tex-3xl font-bold'>Payment Now :{bookings.treatment}</h2>
            <p className="text-xl">please pay<strong>${bookings.price}</strong> for appointment on {bookings.appointmentDate} at{bookings.slot}</p>

            <div className='w-96 my-10'>
                <Elements stripe={stripePromise} >
                    <CheckoutForm 
                        bookings={bookings}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;