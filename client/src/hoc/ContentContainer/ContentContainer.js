import React from 'react';
import './ContentContainer.scss';

 const ContentContainer = (props)=>{

  return(
    <div className = { `${props.narrow ? "content-container--narrow" : "content-container"} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default ContentContainer;
