import React, { Component } from 'react';
import Select from '../Select/Select';


const BedroomSelect = (props)=> {

  const bedOptions = [
      {
        value:"",
        content:"1+ bed"
      },
      {
        value:2,
        content:"2+ bed"
      },
      {
        value:3,
        content:"3+ bed"
      },
      {
        value:4,
        content:"4+ bed"
      }
    ];


  return(
        <Select value ={props.value} name = {props.name} className = {props.className} options = {bedOptions} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default BedroomSelect;
