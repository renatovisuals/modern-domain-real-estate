import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';
import data from '../../db';
import Select from '../Widgets/Select/Select';
import axios from 'axios';
import queryString from 'query-string';


class HeroSection extends Component {

  state = {
    bedrooms:0,
    bathrooms:0,
    location:'',
    listingData:[]
  }

  componentDidMount(){
    const getListings = async () => {
      let res = await axios.get(`/api/listings`);
      this.setState({
        listingData: res.data,
        location:this.getCitySelectOptions(res.data)[0].value
      });
    };
      getListings()
  }

  handleChange = (key,value)=>{
    this.setState({
      [key]:value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    const params = {
      ...(this.state.bedrooms ? {minbedrooms:this.state.bedrooms} :{}),
      ...(this.state.bathrooms ? {minbathrooms:this.state.bathrooms} :{}),
      ...(this.state.location ? {location:this.state.location} :{})
    }
    const query = queryString.stringify(params)
    window.location.href=`/listings?${query}`
  }

  removeDuplicatesFrom = (data)=>{
    data = data.filter((location, index, self) =>
      index === self.findIndex((t) => (
        t.city.toLowerCase() === location.city.toLowerCase() && t.queryString.toLowerCase() === location.queryString.toLowerCase()
      ))
    )
    return data
  }

  getCitiesAndStates = (data)=>{
    const simplifiedData = data.map((home)=>{
      return({
        city:home.city,
        queryString:home.queryString
      })
    })
    return(this.removeDuplicatesFrom(simplifiedData))
  };

  getCitySelectOptions = (data)=>{
    const dataSet = data || this.state.listingData
    const citiesAndStates = this.getCitiesAndStates(dataSet);
    const options = citiesAndStates.map((location)=>{
      return({
        value:location.queryString,
        content:location.city
      })
    })
    return options
  }


render(){
  const options = this.getCitySelectOptions()
  return(
    <section className = "hero-section">
      <ContentContainer>
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <form action ="#">

          <Select options = {options} className ="hero-section__select" name="location" onChange = {this.handleChange}/>
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

          <button type="submit" className ="hero-section__submit-btn" onClick = {(e)=>{this.handleSubmit(e)}}> Find Your Home!</button>
        </form>
      </ContentContainer>
    </section>
  )
}

}

export default HeroSection;
