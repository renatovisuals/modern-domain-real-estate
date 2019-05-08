import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

 const Footer = (props)=>{

  return(
    <div className = "footer">
      <ContentContainer>
        This is the content of the footer
      </ContentContainer>
    </div>
  )
}

export default Footer;
