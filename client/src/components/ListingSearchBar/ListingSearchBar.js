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

  renderResults = ()=>{
    if(this.props.data.length>0 && this.props.searchQuery.length !== 0){
      const results = this.props.data.map((result)=>{
        return (
          <div key = {result.location_id} className = "listing-search-bar__type-ahead-result" onClick = {()=> this.props.handleLocationClick(result.location_id)}>
            {this.formatLocationResults(result)}
          </div>
        )
      })
      return (
        <div>
          <div className = "listing-search-bar__location-header">
            <span className = "listing-search-bar__location-header-title">
              Places
            </span>
          </div>
          {results}
        </div>
      )
    }
    return null
  }

render(){
  return(
    <div className = "listing-search-bar__wrapper">
      <div className = "listing-search-bar__input-container">
        <input autoComplete="off"
               id = "listing-search-bar"
               className = "listing-search-bar"
               type="text" value={this.props.searchQuery}
               onClick={(e)=>this.handleClick(e)}
               onChange = {(e)=>this.props.handleChange(e)}
        />
        <div className = "listing-search-bar__search-btn"> search </div>
      </div>
      <div id = "listing-search-bar-results" className = "listing-search-bar__type-ahead-container">
        {this.state.resultsVisible ? this.renderResults() : null}
      </div>
    </div>
  )
}
}

export default ListingSearchBar;
