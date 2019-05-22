import React from 'react';
import './modal-backdrop.scss';
 const ModalBackdrop = (props)=>{
  return(
    <div onClick = {props.click} className = {`modal-backdrop ${props.hidden ? 'modal-backdrop--hidden' : null}`} >
      {props.children}
    </div>
  )
}

export default ModalBackdrop;
