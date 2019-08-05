import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


 const Footer = (props)=>{

  return(
    <div className = "footer">
      <ContentContainer>
        <div className="footer__section">
          <Link to={'/'}>
            <img className = "footer__logo" src ="/images/logo-white.svg"/>
          </Link>
          <span className = "footer__address">
            201 Main St, Suite 101
            <br/>
            Fort Worth, TX 76107
          </span>
          <span className = "footer__email"> info@moderndomain.com </span>
          <span className = "footer__phone-number"> 806.500.0224 </span>
        </div>
        <div className="footer__section footer__section--about">
          <span className = "footer__section-title"> About Us </span>
          <hr/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="footer__section footer__section--social">
          <span className = "footer__section-title"> Follow Us </span>
          <hr/>
          <div className = "footer__social-media">
            <div className = "footer__social-link">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </div>
            <div className = "footer__social-link">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </div>
            <div className = "footer__social-link">
              <FontAwesomeIcon icon={faPinterestP} size="lg" />
            </div>
            <div className = "footer__social-link">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </div>
          </div>
        </div>
      </ContentContainer>
      <div className ="footer__copyright-container">
        <ContentContainer>
          <span className = "footer__copyright"> 	<FontAwesomeIcon icon = {faCopyright} size = "sm"/> 2019 Modern Domain llc. </span>
        </ContentContainer>
      </div>
    </div>
  )
}

export default Footer;
