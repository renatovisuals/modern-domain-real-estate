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
      </div>
    );
}

export default ListingCard;
