import React, { Component } from 'react';
import './Select.scss';


const Select = (props)=> {

  const renderOptions = ()=>{
    if(props.options){
      return (
        props.options.map((option,i)=>{
          return(
            <option className = "select__option" key={i} value = {option.value}> {option.content} </option>
          )
        })
      )
    }
    return null
  }

  return(
      <div className = {`select ${props.border ? 'select--border' : null} ${props.size === "small" ? 'select--small': null} ${props.className}`}>
        <select value = {props.value} onChange = {(e)=>props.onChange(e.target.name,e.target.value)} name={props.name}>
          {renderOptions()}
        </select>
      </div>
  )

}

export default Select;
