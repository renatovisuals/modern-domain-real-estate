import React, { Component } from 'react';
import ContentContainer from '../../../hoc/ContentContainer/ContentContainer';
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import './SocialMedia.scss';


const SocialMedia = (props)=> {
  const links = [
    {
      type:'twitter',
      link:'https://twitter.com/'
    },
    {
      type:'facebook',
      link:'https://www.facebook.com/'
    },
    {
      type:'pinterest',
      link:'https://www.pinterest.com/'
    },
    {
      type:'instagram',
      link:'https://www.instagram.com/?hl=en'
    }
  ]
  const defaultData = props.links || links;
  const linkTemplate = (link,faIcon)=>{
    return(
      <Link to ={link}>
        <div className = "social-media__social-link">
          <FontAwesomeIcon icon={faIcon} size="lg" />
        </div>
      </Link>
    )
  }
  const renderedLinks = defaultData.map((data)=>{
      switch(data.type){
        case('twitter'):
          return (
            linkTemplate(data.link,faTwitter)
          )
          break;
        case('facebook'):
          return (
            linkTemplate(data.link,faFacebookF)
          )
          break;
        case('instagram'):
          return (
            linkTemplate(data.link,faInstagram)
          )
          break;
        case('pinterest'):
          return (
            linkTemplate(data.link,faPinterestP)
          )
          break;
      }
    })

  return(
    <div className = "social-media">
      {renderedLinks}
    </div>
  )

}

export default SocialMedia;
