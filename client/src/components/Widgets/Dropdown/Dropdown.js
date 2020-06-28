import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import './Dropdown.scss';


const Dropdown = (props)=> {

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
      <div className = {`dropdown ${props.className}`}>
        <FontAwesomeIcon className = "dropdown__icon" icon={faChevronDown} size="lg" />
        <select value = {props.value} onChange = {(e)=>props.onChange(e)} name={props.name}>
          {renderOptions()}
        </select>
      </div>
  )

}

export default Dropdown;
