import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import './ServicesSection.scss';

class ServicesSection extends Component {

  renderCards = ()=>{
    const url = '/images/services-section/';
    const cards = [
      {
        image: `${url}home-icon.png`,
        title:'Real Estate Expertise',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
      },
      {
        image: `${url}local-icon.png`,
        title:'Our Services are Local',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
      },
      {
        image: `${url}inspection-icon.png`,
        title:'High Quality Inspections',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
      }
    ];
    const renderedItems = cards.map((card)=>{
      return(
        <div className = "services-section__card">
          <img className = "services-section__img" src ={card.image}/>
          <h2 className = "services-section__card-title">{card.title}</h2>
          <p className = "services-section__description">{card.description}</p>
        </div>
      )
    })

    return renderedItems
  }



render(){
  this.renderCards();
  return(
    <section className = "services-section">
      <ContentContainer>
        <SectionTitle> Why Choose Modern Domain? </SectionTitle>
        {this.renderCards()}
      </ContentContainer>
    </section>
  )
}

}

export default ServicesSection;
