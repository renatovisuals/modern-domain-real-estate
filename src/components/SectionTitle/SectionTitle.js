import React from 'react';
import './SectionTitle.scss';

function SectionTitle(props) {
  return(
    <h1 className="section-title"> {props.children} </h1>
  )
}

export default SectionTitle;
