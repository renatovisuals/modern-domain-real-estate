import React from "react";
import Slider from "react-slick";
import './slider.scss';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';


const SliderTemplates = (props) => {
    let template = null;
    let dragging = false;
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:10000,
      beforeChange: () => dragging = true,
      afterChange: () => dragging = false,
      ...props.settings
    }

    switch(props.type){
        case('city'):
          template = props.data.map((item,i) => {
            return(
              <div key ={i} className = "page">
               <div className = "page__image" style = {{backgroundImage:`url("/images/city-section/slider-images/${item.image}")`}}></div>
               <div className = "page__description">
               <h1> {item.name} </h1>
               <p> {item.description}</p>
               <button className = "page__btn">View Listings</button>
               </div>

              </div>
            )
          })
          break;
        case('agent'):
          template = props.data.map((agent,i) => {
            return(
              <Link key ={agent._id} to={`/agents/${agent.first_name.toLowerCase()}-${agent.last_name.toLowerCase()}/${agent.agent_id}`} draggable="false" onClick={(e)=> dragging && e.preventDefault()}>
                <Card type = "agent" data ={agent} imagePath ="./images/agents"> </Card>
              </Link>
            )
          })
          break;
        case('newListings'):
          template = props.data.map((listing,i) => {
            return(
              <Link draggable = 'false'>
                <Card type = "listing" data ={listing}> </Card>
              </Link>
            )
          })
          break;
        case('listing'):
          template = props.data.map((listing,i) => {
            return(
              <Link draggable = 'false'>
                <Card type = "listing" data ={listing}> </Card>
              </Link>
            )
          })
          break;
        default:
          template = null;
    }

    return (
      <div className ={`${props.type}-template`}>
        <Slider {...settings}>
          {template}
        </Slider>
      </div>
    );
}

export default SliderTemplates;
