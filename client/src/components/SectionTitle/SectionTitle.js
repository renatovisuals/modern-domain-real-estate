import React from 'react';
import './SectionTitle.scss';

function SectionTitle(props) {

  const style = {
    color: props.white ? 'white' : '#555',
    textShadow: props.shadow ? '0px 2px 3px rgba(0,0,0,0.4)'  : null
  }


  return(
    <h1 className={`section-title ${props.className}`} style = {style}> {props.children} </h1>
  )
}

export default SectionTitle;
