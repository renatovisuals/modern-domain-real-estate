import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import data from '../../db';
import './CitySection.scss';


class CitySection extends Component {


render(){
  const {featuredCities} = data;
  const sliderSettings = {
    arrows:false
  }
  return(
    <section className = "city-section">
      <ContentContainer>
        <SectionTitle white shadow> Choose From Any Major City In Texas </SectionTitle>
        <div className ="slider-container">
         <SliderTemplates type = "city" data ={featuredCities} settings = {sliderSettings}/>
        </div>
      </ContentContainer>
      <div className = "city-section__background">
      </div>
    </section>
  )
}

}

export default CitySection;
