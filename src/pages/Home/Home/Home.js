import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCrads/InfoCards';
import Dental from './Dental/Dental';
import MakeApponitment from './makeAppointment/MakeApponitment';
import Services from './Services/Services';
import Testimonialdd from './Testimonial/Testimonialdd';
// import Testimonial from '/src/pages/Home/Home/Home.js';



const Home = () => {
    return (
        <div className='mx-5'>
           <Banner/>
          <InfoCards></InfoCards>
          <Services></Services>
          <Dental></Dental>
          <MakeApponitment></MakeApponitment>
          <Testimonialdd></Testimonialdd>
        </div>
    );
};

export default Home;