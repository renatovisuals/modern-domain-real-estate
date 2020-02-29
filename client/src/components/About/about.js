import React, { Component } from 'react';
import './about.scss';
import Data from '../../db'
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Nav from '../Nav/Nav';
import AboutHeader from '../AboutHeader/AboutHeader';
import AboutIntro from '../AboutIntro/AboutIntro';
import AboutContent from '../AboutContent/AboutContent';
import SectionTitle from '../SectionTitle/SectionTitle';
import Footer from '../Footer/Footer'

class About extends Component {


render(){

  return(
    <div className = "about">
      <Nav/>
      <AboutHeader/>
      <AboutIntro/>
      <AboutContent/>
      <Footer/>
    </div>
  )
}

}

export default About;
