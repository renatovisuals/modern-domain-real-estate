import React, { Component } from 'react';
import './info-page-template.scss';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

class ExpertisePage extends Component {

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <ContentContainer>
        <div className = "info-page-template">
          <div className = "info-page-template__image" style = {{background:'url("#")'}}></div>
          <p> lorem ipsum text </p>
        </div>
      </ContentContainer>
    )
  }

}

export default ExpertisePage;
