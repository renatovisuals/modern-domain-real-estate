import React from "react";
import Slider from "react-slick";
import './slider.scss';
import { Link } from 'react-router-dom';


const SliderTemplates = (props) => {
    let template = null;
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:10000,
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
          console.log(props.data, "agents");
          template = props.data.map((agent,i) => {
            console.log(agent.image)
            return(
              <Link>
                <div key ={i} className = "agent-card">
                  <div className="agent-card__image" style={{backgroundImage:`url(./images/agents/${agent.image})`}}></div>
                  <span className="agent-card__name"> {agent.name} </span>
                  <span className="agent-card__occupation"> Realtor </span>
                </div>
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
