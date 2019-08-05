import React, { Component } from 'react';
import './info-page-template.scss';
//import SectionTitle from '../SectionTitle/SectionTitle';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import QuickHomeSearch from '../QuickHomeSearch/QuickHomeSearch';

class ExpertisePage extends Component {

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <ContentContainer>
        <div className = "info-page-template">
          <div className = "info-page-template__main-content">
            <h1 className = "info-page-template__title"> {this.props.title} </h1>
            <div className = "info-page-template__article-container">
              <div className = "info-page-template__image" style = {{backgroundImage:`url(${this.props.headerImage})`}}></div>
              <div className = "info-page-template__text-container">
                {this.props.children}
              </div>
            </div>
            <QuickHomeSearch/>
          </div>
        </div>
      </ContentContainer>
    )
  }

}

export default ExpertisePage;
