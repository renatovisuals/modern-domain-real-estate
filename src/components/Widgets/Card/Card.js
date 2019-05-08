import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './card.scss';


const Card = (props) => {
  let template = null;

    switch(props.type){
      case 'listing':
        return(
          <div className = "card">
            <div className = "card__image" style = {{backgroundImage:`url("./images/listings/${props.data.id}/${props.data.images[0]}")`}}></div>
            <div className = "card__details-container">
              <div className ="card__price-and-rooms">
                $480,000
                <span className="card__rooms">
                  4bds
                </span>
                <span className="card__rooms">
                  4ba
                </span>
              </div>
              <div className="card__address">
                3535 Clubgate Dr, Fort Worth, TX
              </div>
            </div>
          </div>
        )
      case 'agent':
        return(
          <Link>
            <div className = "card">
              <div className="card__image" style={{backgroundImage:`url(./images/agents/${props.data.image})`}}></div>
              <div className = "card__details">
                <div className = "card__text-container card__text-container--center">
                  <span className="card__title card__title--center"> {props.data.name} </span>
                  <span className="card__card-text"> Realtor </span>
                </div>
              </div>
            </div>
          </Link>
        )
      default:
        return null;
    }


    return (
      <div className = "card">
        <div className = "card__image" style = {{backgroundImage:`url("${props.image}")`}}></div>
        <div className = "card__details-container">
          {props.children}
        </div>
      </div>
    );
}

export default Card;
