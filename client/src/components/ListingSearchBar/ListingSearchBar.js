import React, { Component } from 'react';
import './ListingSearchBar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

class ListingSearchBar extends Component {

  constructor(){
    super()
    this.state = {
      value:'',
      resultsVisible:true,
      active:false
    }
  }

  handleChange = (e)=>{
    this.setState({
      value:e.target.value
    })
  }

  hideSearchResults = (e)=>{
    if(e.target.id !== "listing-search-bar"){
      this.setState({
      //  resultsVisible:false
      })
    }
  }

  handleFocus = (e)=>{
    this.setState({
      active:true
    })
  }

  getMatchedText = (result)=>{
    if(result.matches){
      const matchedText = result.matches[0].value.substring(result.matches[0].indices[0][0],result.matches[0].indices[0][1]+1)
      const regText = result.matches[0].value.substring(result.matches[0].indices[0][1]+1,result.matches[0].value.length)
      return(
        <div>
          <span className = "listing-search-bar__result-title listing-search-bar__result-title--bold">{matchedText}</span>
          <span className = "listing-search-bar__result-title">{regText}</span>
        </div>
      )
    }
  }

  getAgentMatchedText = (agent) =>{
    if(agent.matches){
      let matchedText = agent.matches[0].value.substring(agent.matches[0].indices[0][0],agent.matches[0].indices[0][1]+1)
      console.log(matchedText,agent.matches[0].indices[0][1], "MATCHED")
      if(agent.matches[0].key === "first_name"){
        let regText = agent.item.first_name.substring(agent.matches[0].indices[0][1]+1,agent.item.first_name.length) + " " + agent.item.last_name;
        return(
          <div>
            <span className = "listing-search-bar__result-title listing-search-bar__result-title--bold">{matchedText}</span>
            <span className = "listing-search-bar__result-title">{regText}</span>
          </div>
        )
      }else if(agent.matches[0].key === "last_name"){
        let regText = agent.matches[0].value.substring(agent.matches[0].indices[0][1]+1,agent.matches[0].value.length)
        return(
          <div>
            <span className = "listing-search-bar__result-title">{`${agent.item.first_name} `}</span>
            <span className = "listing-search-bar__result-title listing-search-bar__result-title--bold">{matchedText}</span>
            <span className = "listing-search-bar__result-title">{regText}</span>
          </div>
        )
      }
    }
  }

  handleBlur = (e)=>{
  setTimeout(()=>{
    this.props.hideListingSearchResults()
    this.setState({
      active:false
    })
  },100)
  }

  handleClick = (result)=>{
    console.log("CLICKED",result)
    this.props.handleResultClick(result)
    this.props.hideListingSearchResults()
    this.setState({
      active:false
    })
  }

  componentDidMount(){
    if(this.props.searchQuery.length>0){
      //this.props.showListingSearchResults()
    }else{
      console.log(this.props.searchQuery, "This is the query")
    }
    window.addEventListener('resize',this.isMobileWidth)
    window.addEventListener('keydown',(e)=>{
      if(e.keyCode === 13){
        this.props.handlePressEnter()
        //console.log(this.props,"THIS")
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.searchQuery !== nextProps.searchQuery){
      return {
        searchQuery: nextProps.searchQuery
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.searchQuery !== prevState.searchQuery){
      this.setState({
        resultsVisible:false
      })
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.isMobileWidth)
    //document.removeEventListener('click',this.hideSearchResults)
    console.log(this.props,"THESE ARE THE PROPS!!")
    this.props.clearSearch()
  }

  formatLocationResults = (result)=>{
    if(result.item.location_type === "city"){
      return(
          <div className = "listing-search-bar__result-text">
            {this.getMatchedText(result)}
            <span className = "listing-search-bar__result-subtitle">
            {result.item.parents[1].name}
            </span>
          </div>
      )
    }else if(result.item.location_type === "county"){
      return(
          <div className = "listing-search-bar__result-text">
            {this.getMatchedText(result)}
            <span className = "listing-search-bar__result-subtitle">
            {result.item.parents[0].name}
            </span>
          </div>
      )
    }else if (result.item.location_type === "neighborhood" || result.item.location_type === "route" || result.item.location_type === "zipcode"){
      return(
          <div className = "listing-search-bar__result-text">
            {this.getMatchedText(result)}
            <span className = "listing-search-bar__result-subtitle">
            {`${result.item.parents[0].name}, ${result.item.parents[2].name}`}
            </span>
          </div>
      )
    }

    return null;
  }

  formatAgentResults = (result)=>{
    return(
          <div className = "listing-search-bar__result-text listing-search-bar__result-text--agent">
            <span className = "listing-search-bar__result-title">
            {this.getAgentMatchedText(result)}
            </span>
            <span className = "listing-search-bar__result-subtitle">
            {`${result.item.city}, ${result.item.state}`}
            </span>
          </div>
    )
  }

  formatAddressResults = (result)=>{
    console.log(result, "ADDRESS RESULT")
    return(
        <div className = "listing-search-bar__result-text">
          <span className = "listing-search-bar__result-title">
          {`${result.item.formatted_address}`}
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
              <div key = {result.location_id} tabIndex="0" id="type-ahead-result" className = "listing-search-bar__type-ahead-result" onClick = {(e)=> {this.handleClick({type:'location', data:result.item})}}>
                {this.formatLocationResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <div className = "listing-search-bar__icon-container">
                  <FontAwesomeIcon icon = {faMapMarkerAlt} size = "lg"/>
                </div>
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
          agents = this.props.data.agents.map((result)=>{
            console.log(result.item,"AGENT")
            return (
              <div key = {result.location_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleResultClick({type:'agent', data:result.item})}>
                <div className = "listing-search-bar__agent-image" style = {{backgroundImage:`url("/images/agents/${result.item.image}")`}}> </div>
                {this.formatAgentResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <div className = "listing-search-bar__icon-container">
                  <FontAwesomeIcon icon = {faUserTie} size = "lg"/>
                </div>
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
              <div key = {result.address_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleResultClick({type:'address', data:result.item})}>
                {this.formatAddressResults(result)}
              </div>
            )
          })
          return(
            <div>
              <div className = "listing-search-bar__location-header">
                <div className = "listing-search-bar__icon-container">
                  <FontAwesomeIcon icon = {faHome} size = "lg"/>
                </div>
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
        <div id = "listing-search-bar-results" className = "listing-search-bar__type-ahead-container">
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
    <div className = {`listing-search-bar ${this.state.active ? "active": ""} ${this.props.isMobile ? "mobile" : ""} ${this.props.className}`}>
      <div className = "listing-search-bar__mobile-search-container ">
        <div className = "listing-search-bar__input-container">
          <button className = "listing-search-bar__back-btn" id = "back-btn" onClick = {this.handleBlur}> 	<FontAwesomeIcon className = "listing-search-bar__back-btn-icon" icon = {faArrowLeft} size = "lg"/> </button>
          <input id = "listing-search-bar"
                 autoComplete="no"
                 autoComplete="off"
                 className = "listing-search-bar__input"
                 type="text"
                 value={this.props.searchQuery}
                 onChange = {(e)=>this.props.handleChange(e)}
                 onFocus = {(e)=>this.handleFocus(e)}
                 onBlur = {(e)=>this.handleBlur(e)}
                 placeholder = {this.props.placeHolder}
          />
          <div className = "listing-search-bar__search-btn"> </div>
        </div>

        {this.props.resultsVisible && this.props.searchQuery.length>=2 ? this.renderResults() : null}

      </div>
    </div>
  )
}
}

export default ListingSearchBar;
