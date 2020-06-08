import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';
import data from '../../db';
import Select from '../Widgets/Select/Select';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';


class HeroSection extends Component {

  state = {
    bedrooms:0,
    bathrooms:0,
    location:'',
    redirect:false,
    cities:null,
    queryStr:''
  }

  componentDidMount(){
    const getListings = async () => {
      await axios.get('/api/locations/get/?type=city')
      .then((res)=>{
        this.setState({
          cities:res.data
        },()=>this.getCitySelectOptions())
      })
      .catch((err)=>console.error(err))
    };
      getListings()
  }

  handleChange = (key,value)=>{
    console.log(key,value,"KEY VALUE")
    this.setState({
      [key]:value
    },()=> console.log(this.state, "STATE VALUES"))
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    const params = {}
    if(this.state.bedrooms) params.bedrooms = this.state.bedrooms;
    if(this.state.bathrooms) params.bathrooms = this.state.bathrooms;
    const queryStr = `${Object.keys(params).length===0 ? '':'?'}${queryString.stringify(params)}`
    const location = this.state.cities.filter((city)=>{
      return city.location_id === parseFloat(this.state.location)
    })
    this.props.history.push(`/listings/for-sale/${location[0].name_id || '_map'}/${queryStr}`)
  }



  getCitySelectOptions = (data)=>{
    const cities = data || this.state.cities
    const options = cities.map((location)=>{
      return({
        value:location.location_id,
        content:`${location.name}, ${location.parents[1].name}`
      })
    })

    this.setState({
      location:cities[0].location_id,
      options
    })
    console.log(options,"OPTIONS")
  }


render(){
  return(
    <section className = "hero-section">
      <ContentContainer>
        <h1 className = "hero-section__title"> Find Your Perfect Texas Home. </h1>
        <h3 className = "hero-section__subtitle"> We provide access to the most upscale living spaces in Texas. </h3>
        <form action ="#">

          <Select options = {this.state.options} className ="hero-section__select" name="location" onChange = {this.handleChange}/>
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

export default withRouter(HeroSection);
