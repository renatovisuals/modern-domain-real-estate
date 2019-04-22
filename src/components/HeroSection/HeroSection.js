import React, { Component } from 'react';
import './HeroSection.scss';


class HeroSection extends Component {


render(){
  return(
    <div className = "hero-section">
      <div className = "hero-section__content">
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <select name="cars">
          <option value="volvo">Select from any available city</option>
          <option value="Fort Worth">Fort Worth</option>
          <option value="Dallas">Dallas</option>
          <option value="Austin">Austin</option>
          <option value="Houton">Houston</option>
          <option value="Granbury">Granbury</option>
        </select>
      </div>
    </div>
  )
}

}

export default HeroSection;
