import React, { Component } from 'react';
import './TextInput.scss';


const TextInput = (props)=> {

  return(
      <input
      placeholder={props.placeholder}
      onChange = {(e)=>props.onChange(e.target.name,e.target.value)} 
      type = "text"
      name={props.name}
      className = {`text-input ${props.size === "small" ? 'text-input--small' : null} ${props.border ? 'text-input--border': null} ${props.className}`}
      value={props.value}
      />
  )

}

export default TextInput;
