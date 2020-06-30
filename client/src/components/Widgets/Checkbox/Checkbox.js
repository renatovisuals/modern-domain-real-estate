import React, { Component } from 'react';
import './Checkbox.scss';


const Checkbox = (props)=> {


  return(
      <label for={props.id} className = {`checkbox ${props.className ? props.className : ""}`}> {props.labelName}
        <input type = "checkbox" id={props.id} name={props.name} value = {props.value} data-category = {props.category} checked = {props.checked} onChange = {(e)=>props.onChange(e)}/>
        <span className = "checkbox__box"> </span>
      </label>
  )

}

export default Checkbox;
