import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './card.scss';


const Card = (props) => {
  let template = null;
  const {data} = props;

    switch(props.type){
      case 'listing':
        return(
          <div className = {`card ${props.className}`} onMouseEnter = {(e)=>props.onMouseEnter(e)} onMouseLeave = {(e)=>props.onMouseLeave(e)}>
            <div className = "card__image" style = {{backgroundImage:props.imagePath}}></div>
            <div className = "card__details">
              <div className = "card__text-container">
                <div className ="card__price-and-rooms">
                  {`$${data.price}`}
                  <span className="card__rooms">
                    {`${data.bedrooms}bd`}
                  </span>
                  <span className="card__rooms">
                    {`${data.bathrooms}bd`}
                  </span>
                </div>
                <div className="card__address">
                  {`${data.street}, ${data.city}, ${data.state}`}
                </div>
              </div>
            </div>
          </div>
        )
      case 'agent':
        const jobTitle = Array.isArray(props.data.qualifications) ? props.data.qualifications[0] : props.data.qualifications;
        return(
            <div className = {`card ${props.className}`}>
              <div className="card__image" style={{backgroundImage:`url(${props.imagePath}/${props.data.image})`}}></div>
              <div className = "card__details">
                <div className = "card__text-container card__text-container--center">
                  <span className="card__title card__title--center"> {`${props.data.first_name} ${props.data.last_name}`} </span>
                  <span className="card__card-text"> {jobTitle} </span>
                </div>
              </div>
            </div>
        )
      default:
        return null;
    }


    return (
      <div className = {`card ${props.className}`}>
        <div className = "card__image" style = {{backgroundImage:`url("${props.image}")`}}></div>
        <div className = "card__details-container">
          {props.children}
        </div>
      </div>
    );
}

export default Card;
