import React, { Component } from 'react';
import './Checkbox.scss';


const Checkbox = (props)=> {


  return(
      <div className = {`checkbox ${props.className ? props.className : ""}`}>
        <input type = "checkbox" id={props.id} name={props.name} value = {props.value} data-category = {props.category} checked = {props.checked} onChange = {(e)=>props.onChange(e)}/>
        <label for = {props.id}> {props.labelName} </label>
      </div>
  )

}

export default Checkbox;

//<input id="single-family" type="checkbox" name="singleFamily" value="Single Family" data-category = "propertyTypes" checked={this.props.filterState.singleFamily} onChange = {(e)=>this.props.handleChange(e)}/>
//<label for="single-family">Single Family</label><br/>
