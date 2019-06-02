import React, { Component } from 'react';
import './Select.scss';


const Select = (props)=> {
  const defaultOptions = [
    {
      value:"false",
      content:"Select a City"
    },
    {
      value:"Fort Worth",
      content:"Fort Worth"
    },
    {
      value:"Dallas",
      content:"Dallas"
    }
  ]

  const options = props.options || defaultOptions;

  const renderOptions = options.map((option)=>{
    return(
      <option value = {option.value}> {option.content} </option>
    )
  })

  return(
    <div
    className = {`select ${props.border ? 'select--border' : null} ${props.size === "small" ? 'select--small': null} ${props.className}`}
    onChange = {props.onChange}
    >
      <select name={props.name}>
        {renderOptions}
      </select>
    </div>
  )

}

export default Select;
