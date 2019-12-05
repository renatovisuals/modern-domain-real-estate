import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';
import data from '../../db';
import Select from '../Widgets/Select/Select';
import {Link} from 'react-router-dom';


class HeroSection extends Component {

  state = {
    bedrooms:0,
    bathrooms:0,
    city:''
  }

  handleChange = (key,value)=>{
    this.setState({
      [key]:value
    },()=>console.log(this.state,"this is the new state"))
  }

  handleSubmit = (e)=>{
    window.location.href=`/listings`
  }


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

  return(
    <section className = "hero-section">
      <ContentContainer>
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <form action ="#">

          <Select options = {options} className ="hero-section__select" name="city" onChange = {this.handleChange}/>
          <Select
            className ="hero-section__select--small"
            onChange = {this.handleChange}
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
            onChange = {this.handleChange}
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

          <Link className ="hero-section__submit-btn" onClick = {(e)=>{this.handleSubmit(e)}}> Find Your Home!</Link>
        </form>
      </ContentContainer>
    </section>
  )
}

}

export default HeroSection;
