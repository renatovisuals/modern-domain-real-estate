import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import Slider from '../Slider/Slider';
import './CitySection.scss';


class CitySection extends Component {


render(){
  return(
    <section className = "city-section">
      <ContentContainer>
        <SectionTitle> Choose From Any Major City In Texas </SectionTitle>
      </ContentContainer>
      <div className ="slider-container">
        <Slider/>
      </div>
    </section>
  )
}

}

export default CitySection;
