import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import Card from '../Widgets/Card/Card';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './MainListingPage.scss';


class MainListingPage extends Component {

  state = {
    queries:{},
    city:'FortWorth',
    agentName:'',
    agentCity:'',
    agentData:[]
  }

  componentDidMount(){
    window.scrollTo(0,0);
    const string = this.props.location.search;
    const parsed = queryString.parse(string);
    this.setState({
      queries:parsed
    })
  }


  render(){
    console.log(this.props,"listing page props")
    return(
      <div className="main-listing-page">
        hello, this is the main listing page!<br/>
        bedrooms:{this.state.queries.bedrooms}<br/>
        bathrooms:{this.state.queries.bathrooms}<br/>
        city:{this.state.queries.city}<br/>
      </div>
    )
  }
}

export default MainListingPage;
