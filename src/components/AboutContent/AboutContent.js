import React, { Component } from 'react';
import './about-content.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutContent = (props)=> {

  return(
      <ContentContainer>
        <div className = "about-content">
          <div className ="about-content__content-container">
            <div className ="about-content__image"></div>
            <div className ="about-content__image-description">
              <SectionTitle className = "about-content__content-title"> Texas' best real estate resource </SectionTitle>
            </div>
          </div>
        </div>
      </ContentContainer>
  )
}

export default AboutContent;
