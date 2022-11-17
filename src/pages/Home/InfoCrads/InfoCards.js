import React from 'react';
import clock from './../../../assets/icons/clock.svg'
import marker from './../../../assets/icons/marker.svg'
import phone from './../../../assets/icons/phone.svg'
import InfoCard from './InfoCard';

const InfoCards = () => {
    const cards =[
        {
            id:1,
            name:'Opening Hours',
            description:'Open 9.00 am to 5.00pm everyday',
            icon:clock,
            bgClass:'bg-primary'
        },
        {
            id:2,
            name:'Our Locations',
            description:'Open 9.00 am to 5.00pm everyday',
            icon:marker,
            bgClass:'bg-primary'
        },
        {
            id:1,
            name:'Contact',
            description:'Open 9.00 am to 5.00pm everyday',
            icon:phone,
            bgClass:'bg-primary'
        },
    ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-4'>
            {
                cards.map(card=><InfoCard key={card.id} card={card}></InfoCard>)

               
            }
        </div>
    );
};

export default InfoCards;