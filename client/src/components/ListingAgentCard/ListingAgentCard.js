import React, { Component } from 'react';
import './ListingAgentCard.scss';

class ListingAgentCard extends Component {

  state = {

  }

  componentDidMount(){
    console.log(this.props.agent)
  }

  render(){

    return(
      <div className = "listing-agent-card">
        <div className = "listing-agent-card__profile-picture">
        
        </div>
        {this.props.agentData.first_name}
      </div>
    )
  }

}

export default ListingAgentCard;
