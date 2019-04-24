import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';


class HeroSection extends Component {


render(){
  return(
    <section className = "hero-section">
      <ContentContainer>
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <form action ="#">
          <div class = "hero-section__select">
            <select name="city">
              <option value="0">Select an available city</option>
              <option value="Fort Worth">Fort Worth</option>
              <option value="Dallas">Dallas</option>
              <option value="Austin">Austin</option>
              <option value="Houston">Houston</option>
              <option value="Granbury">Granbury</option>
            </select>
          </div>
          <div className ="hero-section__select hero-section__select--small">
            <select name="bedrooms">
              <option value="1">1+ bed</option>
              <option value="2">2+ bed</option>
              <option value="3">3+ bed</option>
              <option value="4">4+ bed</option>
            </select>
          </div>
          <div className ="hero-section__select hero-section__select--small">
            <select name="bathrooms">
              <option value="1">1+ bath</option>
              <option value="2">2+ baths</option>
              <option value="3">3+ baths</option>
              <option value="4">4+ baths</option>
            </select>
          </div>
          <button type="submit" className ="hero-section__submit-btn" onClick = {(e)=>{e.preventDefault()}}> Find Your Home!</button>
        </form>
      </ContentContainer>
    </section>
  )
}

}

export default HeroSection;
