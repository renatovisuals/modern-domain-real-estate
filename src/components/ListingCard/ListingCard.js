import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './listingcard.scss';


const ListingCard = (props) => {
const {data} = props;
console.log(data.images[0],data.id, "this is the data")

    return (
      <div className = "listing-card">
        <div className = "listing-card__image" style = {{backgroundImage:`url("./images/listings/${data.id}/${data.images[0]}")`}}></div>
        <div className = "listing-card__details-container">
          <div className ="listing-card__price-and-rooms">
            $480,000
            <span className="listing-card__rooms">
              4bds
            </span>
            <span className="listing-card__rooms">
              4ba
            </span>
          </div>
          <div className="listing-card__address">
            3535 Clubgate Dr, Fort Worth, TX
          </div>
        </div>
      </div>
    );
}

export default ListingCard;
