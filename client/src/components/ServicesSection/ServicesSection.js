import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import './ServicesSection.scss';

class ServicesSection extends Component {

  renderCards = ()=>{
    const url = '/images/services-section/';
    const cards = [
      {
        image: `${url}home-icon-square.png`,
        title:'Real Estate Expertise',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        linkTo: 'about/expertise'
      },
      {
        image: `${url}texas-icon-square.png`,
        title:'Our Services are Local',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        linkTo: 'about/services'
      },
      {
        image: `${url}trust-icon-square.png`,
        title:'Trusted for 25 years',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        linkTo: 'about/community'
      }
    ];

    const renderedItems = cards.map((card)=>{
      return(
        <Link  to = {`${card.linkTo}`} className = "services-section__card" >
            <img className = "services-section__image" src ={card.image}/>
            <h2 className = "services-section__card-title">{card.title}</h2>
            <p className = "services-section__description">{card.description}</p>
        </Link>
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
