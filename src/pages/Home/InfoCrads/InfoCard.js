import React from 'react';

const InfoCard = ({card}) => {
    // console.log(card);
    const {name,description,icon,bgClass} =card;
    return (
        <div className={`card p-6 text-white md:card-side shadow-xl ${bgClass}`}>
            <figure>
                <img src={icon} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className='card-title'>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
 };

export default InfoCard;