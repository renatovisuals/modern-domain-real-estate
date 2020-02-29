import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import HeroSection from '../HeroSection/HeroSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import CitySection from '../CitySection/CitySection';
import AgentSection from '../AgentSection/AgentSection';
import NewestListingSection from '../NewestListingSection/NewestListingSection';
import Footer from '../Footer/Footer';


class Home extends Component {

componentDidMount(){
  window.scrollTo(0,0);
}

render(){
  return(
    <div>
      <Nav />
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
