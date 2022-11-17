import React from 'react';

const Review = ({ review }) => {
    const { name, details, img,location } = review;
    return (
        <div>
            <div className="card shadow-xl">
                <div className="card-body">

                    <p>{details}</p>
                    <div className="flex align-items-center">
                        <div className="avatar mr-8">
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt='' />
                            </div>
                            <div>
                                <h4 className='text-lg'>{name}</h4>
                                <h4 className='text-sm'>{location}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;