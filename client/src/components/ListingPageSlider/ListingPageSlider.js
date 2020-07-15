import React, { Component } from 'react';
import Slider from "react-slick";
import './ListingPageSlider.scss';
import axios from 'axios';

class ListingPage extends Component {

  state = {
    //listing:null
  }

  render(){
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
      ...this.props.settings
    }

    return (
        <Slider className = "listing-page-slider" {...settings}>
          <div className = "listing-page-slider__test"></div>
          <div className = "listing-page-slider__test"></div>
          <div className = "listing-page-slider__test"></div>
          <div className = "listing-page-slider__test"></div>
        </Slider>
    );
  }
}

export default ListingPage;
