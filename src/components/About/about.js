import React, { Component } from 'react';
import './about.scss';
import Data from '../../db'
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import AboutHeader from '../AboutHeader/AboutHeader';
import AboutIntro from '../AboutIntro/AboutIntro';
import AboutContent from '../AboutContent/AboutContent';
import SectionTitle from '../SectionTitle/SectionTitle';

class About extends Component {


render(){

  return(
    <div className = "about">
      <AboutHeader/>
      <AboutIntro/>
      <AboutContent/>
    </div>
  )
}

}

export default About;
