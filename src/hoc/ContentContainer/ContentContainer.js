import React from 'react';
import './ContentContainer.scss';

 const ContentContainer = (props)=>{
   console.log(props.children)

  return(
    <div className = "content-container">
      {props.children}
    </div>
  )
}

export default ContentContainer;
