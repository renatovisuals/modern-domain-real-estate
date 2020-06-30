import React, { Component } from 'react';
import Select from '../Select/Select';


const BathroomSelect = (props)=> {

  const bathOptions = [
      {
        value:"",
        content:"1+ bath"
      },
      {
        value:2,
        content:"2+ bath"
      },
      {
        value:3,
        content:"3+ bath"
      },
      {
        value:4,
        content:"4+ bath"
      },
      {
        value:5,
        content:"5+ bath"
      }
    ]


  return(
        <Select value ={props.value} name = {props.name} className = {props.className} options = {bathOptions} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default BathroomSelect;
