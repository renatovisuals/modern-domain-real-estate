import React, { Component } from 'react';
import './about-content.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import Card from '../Widgets/Card/Card';

const AboutContent = (props)=> {

  return(
      <ContentContainer>
        <div className = "about-content">
          <div className ="about-content__content-container">
            <div className ="about-content__image about-content__image--longhorn"></div>
            <div className ="about-content__image-description">
              <div>
                <SectionTitle className = "about-content__paragraph-title"> Texas' best real estate resource </SectionTitle>
                <p className = "about-content__content-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id porta nibh. Ultrices sagittis orci a scelerisque purus semper eget duis. Tristique nulla aliquet enim tortor at auctor. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus.</p>
              </div>
            </div>
          </div>
          <div className ="about-content__content-container">
            <div className ="about-content__image-description about-content__image-description--left">
              <div>
                <SectionTitle className = "about-content__paragraph-title about-content__content-title--left"> Unparalleled real estate expertise </SectionTitle>
                <p className = "about-content__content-paragraph about-content__content-paragraph--left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id porta nibh. Ultrices sagittis orci a scelerisque purus semper eget duis. Tristique nulla aliquet enim tortor at auctor. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus.</p>
              </div>
            </div>
            <div className ="about-content__image about-content__image--expertise"></div>
          </div>
        </div>
        <div className ="about-content__meet-our-founders">
          <SectionTitle className = "about-content__title"> Meet Our Founders </SectionTitle>
          <p className = "about-content__founders-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id porta nibh. Ultrices sagittis orci a scelerisque purus semper eget duis </p>
          <div className ="about-content__founders">
            <Card className = "about-content__founder-card" type = 'agent' data = {{firstName:'Callie',lastName:'Saurus',qualifications:'Co-founder', image:'calliesaurus.jpg'}} imagePath ="/images/founders"/>
            <Card className = "about-content__founder-card" type = 'agent' data = {{firstName:'Malan',lastName:'Alankara',qualifications:'Founder', image:'malanalankara.jpg'}} imagePath ="/images/founders"/>
          </div>
        </div>
      </ContentContainer>
  )
}

export default AboutContent;
