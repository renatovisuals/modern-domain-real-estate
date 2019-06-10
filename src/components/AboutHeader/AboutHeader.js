import React, { Component } from 'react';
import './about-header.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

const AboutHeader = (props)=> {

  return(
      <div className = "about-header">
        <ContentContainer className = "about-header__content-container">
          <div className = "about-header__text-background">
            <h1 className = "about-header__title"> Introducing <br/> <span> Modern Domain </span> </h1>
            <p className = "about-header__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. </p>
          </div>
        </ContentContainer>
      </div>
  )
}


export default AboutHeader;
