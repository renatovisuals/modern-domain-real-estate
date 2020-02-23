import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer'
import './HeroSection.scss';
import data from '../../db';
import Select from '../Widgets/Select/Select';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class HeroSection extends Component {

  state = {
    bedrooms:0,
    bathrooms:0,
    paramStr:'',
    listingData:[],
    location:'',
    redirect:false,
    cities:null
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

  renderRedirect = () =>{
    if(this.state.redirect){
      return <Redirect to={`/listings/for-sale/${this.state.location || '_map'}/${this.state.paramStr}`} />
    }
  }

  handleChange = (key,value)=>{
    this.setState({
      [key]:value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    let paramStr="";
    const params = {
    //  ...(this.state.location ? {location:this.state.location} :{}),
      ...(this.state.bedrooms ? {'bedrooms.min':this.state.bedrooms} :{}),
      ...(this.state.bathrooms ? {'bathrooms.min':this.state.bathrooms} :{})
    }
    for(let param in params){
      paramStr += param + "=" + params[param] + "/"
    }
    console.log(paramStr, "param string")
    this.setState({
      paramStr,
      redirect:true
    },()=>console.log(this.state,"this is the state"))
  }



  getCitySelectOptions = (data)=>{
    const cities = data || this.state.cities
    const options = cities.map((location)=>{
      return({
        value:location.name,
        content:`${location.name}, ${location.parents[1].name}`
      })
    })
    this.setState({
      options
    })
  }


render(){

  //const options = this.getCitySelectOptions()
  return(
    <section className = "hero-section">
      {this.renderRedirect()}
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

export default HeroSection;
