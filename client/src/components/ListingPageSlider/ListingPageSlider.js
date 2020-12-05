import React, { Component } from 'react';
import Slider from "react-slick";
import './ListingPageSlider.scss';
import axios from 'axios';

class ListingPage extends Component {

  state = {
    images:[],
    nav1:null,
    nav2:null
  }

  async componentDidMount(){
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
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
      //arrows:true,
      //slidesToScroll: 1,
      swipeThreshold:100,
      swipeToSlide:true,
      autoplay: false,
      autoplaySpeed:10000,
      beforeChange: () => dragging = true,
      afterChange: () => dragging = false,
      //variableWidth:true,
      //variableHeight:true,
      ...this.props.settings
    }

    const bottomSettings = {
      ...settings,
      slidesToShow:5,
      beforeChange:null,
      afterChange:null,
      arrows:true,
      focusOnSelect:true,
      slidesToScroll:5
      //slidesToScroll:true
      //slidesToScroll:null,
    }

    const renderMainSlides = ()=>{
      let slides;
      slides = this.state.images.map((image)=>{
        return(
          <div className = "listing-page-slider__top-slides">
            <div className = "listing-page-slider__image" style = {{backgroundImage:`url('/images/listings/${this.props.listing.listing_id}/${image}')`}}>
            </div>
          </div>
        )
      })
      return slides
    }

    const renderBottomSlides = ()=>{
      let slides;
      slides = this.state.images.map((image)=>{
        return(
          <div className = "listing-page-slider__bottom-slides">
            <div className = "listing-page-slider__slide-overlay"></div>
            <div className = "listing-page-slider__image listing-page-slider__image--bottom" style = {{backgroundImage:`url('/images/listings/${this.props.listing.listing_id}/${image}')`}}>
            </div>
          </div>
        )
      })
      return slides
    }

    return (
        <div>
          <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className = "listing-page-slider listing-page-slider--top" {...settings}>
            {renderMainSlides()}
          </Slider>
          <Slider  asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)} className = "listing-page-slider listing-page-slider--bottom" {...bottomSettings}>
            {renderBottomSlides()}
          </Slider>
        </div>
    );
  }
}

export default ListingPage;
