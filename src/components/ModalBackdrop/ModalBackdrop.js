import React from 'react';

 const ModalBackdrop = (props)=>{
  let style = {
    position:'fixed',
    zIndex:'100',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    background:'rgba(0,0,0,0.3)'
  }

  return(
    <div onClick = {props.click} style = {style}>
    </div>
  )
}

export default ModalBackdrop;
