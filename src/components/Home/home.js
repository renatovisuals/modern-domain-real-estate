import React, { Component } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import CitySection from '../CitySection/CitySection';
import AgentSection from '../AgentSection/AgentSection';
import NewestListingSection from '../NewestListingSection/NewestListingSection';
import Footer from '../Footer/Footer';


class Home extends Component {


render(){
  return(
    <div>
      <HeroSection />
      <ServicesSection />
      <CitySection />
      <AgentSection />
      <NewestListingSection />
      <Footer />
    </div>
  )
}

}

export default Home;
