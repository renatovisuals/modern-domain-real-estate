import React, { Component } from 'react';
import './Select.scss';


const Select = (props)=> {

  return(
    <div className = "select">
      <select name="city">
        <option value="0">Select a City</option>
        <option value="Fort Worth">Fort Worth</option>
        <option value="Dallas">Dallas</option>
        <option value="Austin">Austin</option>
        <option value="Houston">Houston</option>
        <option value="Granbury">Granbury</option>
      </select>
    </div>
  )

}

export default Select;
