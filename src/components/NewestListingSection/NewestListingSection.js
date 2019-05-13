import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import data from '../../db';
import './NewestListingSection.scss';
import SliderTemplates from '../Widgets/Slider/Slider_templates';
import Card from '../Widgets/Card/Card';


const NewestListingSection = ()=> {
  const houses = ()=>{
    let arr = new Array
    for (let i=0; i<4 ; i++){
      arr.push(data.houses[i])
    }
    return arr;
  }
  const sliderSettings = {
    slidesToShow:4,
    autoplay:false,
    responsive: [
      {
        breakpoint:1200,
        settings:{
          slidesToShow:2,
          arrows:false
        }
      },
      {
        breakpoint:1500,
        settings:{
          slidesToShow:3,
          arrows:false
        }
      },
      {
        breakpoint:700,
        settings:{
          slidesToShow:1,
          arrows:false
        }
      }
    ]
  }

  return(
    <section className = "new-listings">
      <ContentContainer>
        <SectionTitle> Newest Listings </SectionTitle>
        <SliderTemplates settings = {sliderSettings} type ="newListings" data ={houses()} />
      </ContentContainer>
    </section>
  )
}


export default NewestListingSection;
