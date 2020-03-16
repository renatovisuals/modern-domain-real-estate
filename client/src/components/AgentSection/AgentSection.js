import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import { Link } from 'react-router-dom';
import axios from 'axios';
import data from '../../db';
import './agentsection.scss';


class AgentSection extends Component {

  state = {
    agents:[]
  }


  componentDidMount(){
    const getFeaturedAgents = async () => {
      let res = await axios.get("/api/agents/get");
      //const agents = Array.from(res.data);
      console.log(res.data,"agents from agent section")
      this.setState({
        agents:res.data
      },()=>console.log(this.state.agents,"new state agents"))
    };
    getFeaturedAgents();
  }


  render(){
    const agents = this.state.agents;
    let dragging = false;
    const featuredAgents = agents.filter((agent)=>{
      return agent.featured
    })
    console.log(featuredAgents,"Featured Agents!")
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
          <Link to="/agents" className = "agent-section__find-agent"> find an agent near you </Link>
          <SliderTemplates type = "agent" data = {featuredAgents} settings = {sliderSettings}> </SliderTemplates>
        </ContentContainer>
      </section>
    )
  }

}

export default AgentSection;
