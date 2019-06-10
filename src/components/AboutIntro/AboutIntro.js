import React, { Component } from 'react';
import './about-intro.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutIntro = (props)=> {

  return(
      <div className = "about-intro">
        <ContentContainer>
          <div>
            <blockquote className = "about-intro__quote">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </blockquote>
          </div>

          <hr className = "about-intro__horizontal-rule"/>

          <div>
            <SectionTitle className ="about-intro__title" > We know realty better than Texas knows smoked ribs </SectionTitle>
            <p className = "about-intro__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id porta nibh. Ultrices sagittis orci a scelerisque purus semper eget duis. Tristique nulla aliquet enim tortor at auctor. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Cursus sit amet dictum sit amet justo donec enim. Ut etiam sit amet nisl purus in. Lorem ipsum dolor sit amet consectetur. Leo vel orci porta non. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Egestas erat imperdiet sed euismod nisi porta. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Congue eu consequat ac felis. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Vel risus commodo viverra maecenas. Vitae tortor condimentum lacinia quis. </p>
            <p className = "about-intro__description"> Consectetur libero id faucibus nisl tincidunt eget. Vel quam elementum pulvinar etiam non quam lacus. Fermentum dui faucibus in ornare. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Integer vitae justo eget magna fermentum iaculis eu. Volutpat lacus laoreet non curabitur gravida arcu. Ut eu sem integer vitae. Aliquet porttitor lacus luctus accumsan. Hendrerit dolor magna eget est lorem ipsum. Aliquet risus feugiat in ante metus. Amet consectetur adipiscing elit pellentesque habitant morbi.</p>
          </div>
        </ContentContainer>
      </div>
  )
}


export default AboutIntro;
