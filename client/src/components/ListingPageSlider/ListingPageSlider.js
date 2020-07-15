import React, { Component } from 'react';
import Slider from "react-slick";
import './ListingPageSlider.scss';
import axios from 'axios';

class ListingPage extends Component {

  state = {
    images:[]
  }

  async componentDidMount(){
    let res = await axios.get(`/api/images/get?listing_id=${this.props.listing.listing_id}`)
    this.setState({
      images:res.data
    },()=>console.log(this.state,"NEW STATE"))
  }

  render(){
    //background-image: url("/images/hero-image3.jpg");
    let dragging = false;
    const settings = {
      dots: false,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed:10000,
      beforeChange: () => dragging = true,
      afterChange: () => dragging = false,
      ...this.props.settings
    }

    const renderSlides = ()=>{
      let slides;
      slides = this.state.images.map((image)=>{
      console.log(this.state.images,"images")
        //console.log(`url("/images/listings/${this.props.listing.listing_id}/${image}")`,"THIS IS THE LINK")
        return(
          <div className = "listing-page-slider__test">
            <div className = "listing-page-slider__image" style = {{backgroundImage:`url('/images/listings/${this.props.listing.listing_id}/${image}')`}}>

            </div>
          </div>
        )
      })

      return slides
    }

    return (
        <Slider className = "listing-page-slider" {...settings}>
          {renderSlides()}
        </Slider>
    );
  }
}

export default ListingPage;
