import React, { Component } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import CitySection from '../CitySection/CitySection';
import AgentSection from '../AgentSection/AgentSection';
import NewestListingSection from '../NewestListingSection/NewestListingSection';


class Home extends Component {


render(){
  return(
    <div>
      <HeroSection />
      <ServicesSection />
      <CitySection />
      <AgentSection />
      <NewestListingSection />
    </div>
  )
}

}

export default Home;
