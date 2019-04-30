import React from "react";
import Slider from "react-slick";
import './slider.scss';


const SliderTemplates = (props) => {
    let teplate = null;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      ...props.settings
    }

    switch(props.type){
        case('city'):
          template = props.data.map((item,i) => {
            return(
              <div>
              The City is {item.name}
              </div>
            )
          })
    }

    return (
      <Slider {...settings}>
        {template}
      </Slider>
    );
}

export default SliderTemplates;
