import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';
import data from '../../db';
import Select from '../Widgets/Select/Select';


class HeroSection extends Component {


render(){
  const arr = []
  for(let i =0; i<data.houses.length; i++){
   const house = data.houses[i];
   arr.push(house.city)
  }
  const cities = [...new Set(arr)];
  const options = cities.map((city)=>{
    return({
      value:city,
      content:city
    })
  })
  console.log(options,"these are the options")


  return(
    <section className = "hero-section">
      <ContentContainer>
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <form action ="#">

          <Select options = {options} className ="hero-section__select" name="city" />
          <Select
            className ="hero-section__select--small"
            options = {[
              {
                value:1,
                content:"1+ bed"
              },
              {
                value:2,
                content:"2+ bed"
              },
              {
                value:3,
                content:"3+ bed"
              },
              {
                value:4,
                content:"4+ bed"
              }
            ]}
            name="bedrooms"
            />
            
          <Select
            className ="hero-section__select--small"
            options = {[
              {
                value:1,
                content:"1+ bath"
              },
              {
                value:2,
                content:"2+ bath"
              },
              {
                value:3,
                content:"3+ bath"
              },
              {
                value:4,
                content:"4+ bath"
              }
            ]}
            name="bathrooms"
            />

          <button type="submit" className ="hero-section__submit-btn" onClick = {(e)=>{e.preventDefault()}}> Find Your Home!</button>
        </form>
      </ContentContainer>
    </section>
  )
}

}

export default HeroSection;
