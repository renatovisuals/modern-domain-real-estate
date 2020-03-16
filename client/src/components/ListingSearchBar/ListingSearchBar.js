import React, { Component } from 'react';
import './ListingSearchBar.scss';

class ListingSearchBar extends Component {

  state = {
    value:'',
    resultsVisible:true
  }

  handleChange = (e)=>{
    this.setState({
      value:e.target.value
    })
  }

  hideSearchResults = (e)=>{
    if(e.target.id !== "listing-search-bar"){
      this.setState({
        resultsVisible:false
      })
    }
  }

  componentDidMount(){
    document.addEventListener('click',this.hideSearchResults)
  }

  componentWillUnmount(){
    document.removeEventListener('click',this.hideSearchResults)
  }

  handleClick = ()=>{
    this.setState({
      resultsVisible:true
    })
  }

  formatLocationResults = (result)=>{
    if(result.location_type === "city"){
      return(
          <div className = "listing-search-bar__result-text">
            <span className = "listing-search-bar__result-title">
            {result.name}
            </span>
            <span className = "listing-search-bar__result-subtitle">
            {result.parents[1].name}
            </span>
          </div>
      )
    }else if(result.location_type === "county"){
      return(
          <div className = "listing-search-bar__result-text">
            <span className = "listing-search-bar__result-title">
            {result.name}
            </span>
            <span className = "listing-search-bar__result-subtitle">
            {result.parents[0].name}
            </span>
          </div>
      )
    }else if (result.location_type === "neighborhood" || result.location_type === "route" || result.location_type === "zipcode"){
      return(
          <div className = "listing-search-bar__result-text">
            <span className = "listing-search-bar__result-title">
            {result.name}
            </span>
            <span className = "listing-search-bar__result-subtitle">
            {`${result.parents[0].name}, ${result.parents[2].name}`}
            </span>
          </div>
      )
    }

    return null;
  }

  formatAgentResults = (result)=>{
    return(
        <div className = "listing-search-bar__result-text">
          <span className = "listing-search-bar__result-title">
          {`${result.first_name} ${result.last_name}`}
          </span>
          <span className = "listing-search-bar__result-subtitle">
          {`${result.city}, ${result.state}`}
          </span>
        </div>
    )
  }

  formatAddressResults = (result)=>{
    return(
        <div className = "listing-search-bar__result-text">
          <span className = "listing-search-bar__result-title">
          {`${result.formatted_address}`}
          </span>
        </div>
    )
  }

  renderResults = ()=>{
    let locations,agents,addresses;
    if(this.props.searchQuery.length !== 0){
      //getting location results and formatting them
      const getLocations = ()=> {
        if(this.props.data.locations){
          locations = this.props.data.locations.map((result)=>{
            return (
              <div key = {result.location_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleResultClick({type:'location', id:result.location_id})}>
                {this.formatLocationResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <span className = "listing-search-bar__location-header-title">
                  Places
                </span>
              </div>
              {locations}
            </div>
          )
        }
      }
      //getting agent results and formatting them
      const getAgents = ()=> {
        if(this.props.data.agents){
          addresses = this.props.data.agents.map((result)=>{
            return (
              <div key = {result.location_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleResultClick({type:'agent', id:result.agent_id})}>
                {this.formatAgentResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <span className = "listing-search-bar__location-header-title">
                  Agents
                </span>
              </div>
              {agents}
            </div>
          )
        }
      }

      const getAddresses = ()=> {
        if(this.props.data.addresses){
           addresses = this.props.data.addresses.map((result)=>{
            return (
              <div key = {result.address_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleResultClick({type:'address', id:result.address_id})}>
                {this.formatAddressResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <span className = "listing-search-bar__location-header-title">
                  Adresses
                </span>
              </div>
              {addresses}
            </div>
          )
        }
      }


      return (
        <div>
          {getLocations()}
          {getAgents()}
          {getAddresses()}
        </div>
      )
    }
    return null
  }

render(){
  return(
    <div className = {`listing-search-bar__wrapper--mobile ${this.props.className}`}>
      <div className = "listing-search-bar__input-container">
        <input autoComplete="off"
               id = "listing-search-bar"
               className = "listing-search-bar listing-search-bar--mobile"
               type="text" value={this.props.searchQuery}
               onClick={(e)=>this.handleClick(e)}
               onChange = {(e)=>this.props.handleChange(e)}
               placeholder = "City, Neighborhood, Address, ZIP, Agent"
        />
        <div className = "listing-search-bar__search-btn"> </div>
      </div>
      <div id = "listing-search-bar-results" className = "listing-search-bar__type-ahead-container">
        {this.state.resultsVisible ? this.renderResults() : null}
      </div>
    </div>
  )
}
}

export default ListingSearchBar;
