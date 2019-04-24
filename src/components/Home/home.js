import React, { Component } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import CitySection from '../CitySection/CitySection';


class Home extends Component {


render(){
  return(
    <div>
      <HeroSection />
      <ServicesSection />
      <CitySection />
    </div>
  )
}

}

export default Home;
