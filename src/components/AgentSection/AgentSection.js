import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import data from '../../db';
import './agentsection.scss';


class AgentSection extends Component {


render(){
  const agents = data.agents;
  const featuredAgents = agents.filter((agent)=>{
    return agent.featured
  })
  const sliderSettings = {
    slidesToShow:4,
    autoplay:false,
    responsive: [
      {
        breakpoint:1000,
        settings:{
          slidesToShow:2,
          arrows:false
        }
      },
      {
        breakpoint:1400,
        settings:{
          slidesToShow:3,
          arrows:false
        }
      },
      {
        breakpoint:480,
        settings:{
          slidesToShow:1,
          arrows:false
        }
      }
    ]
  }
  return(
    <section className = "agent-section">
      <ContentContainer narrow>
        <SectionTitle> Choose The Perfect Agent For Your Needs </SectionTitle>
        <SliderTemplates type = "agent" data = {featuredAgents} settings = {sliderSettings}> </SliderTemplates>
      </ContentContainer>
    </section>
  )
}

}

export default AgentSection;
