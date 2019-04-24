import React from 'react';
import 'ContentContainer.scss';

 const ContentContainer = (props)=>{


  return(
    <div className = "content-container">
      {props.children}
    </div>
  )
}

export default ContentContainer;
