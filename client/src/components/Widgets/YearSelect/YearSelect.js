import React, { Component } from 'react';
import Select from '../Select/Select';


const YearSelect = (props)=> {

  const yearOptions = [
    {
      content:"2020",
      value:2020
    },
    {
      content:"2019",
      value:2019
    },
    {
      content:"2018",
      value:2018
    },
    {
      content:"2017",
      value:2017
    },
    {
      content:"2016",
      value:2016
    },
    {
      content:"2015",
      value:2015
    },
    {
      content:"2010",
      value:2010
    },
    {
      content:"2005",
      value:2005
    },
    {
      content:"2000",
      value:2000
    },
    {
      content:"1995",
      value:1995
    },
    {
      content:"1990",
      value:1990
    }
  ]

  const options = [{content:props.label,value:""},...yearOptions]

  return(
        <Select value ={props.value}  name = {props.name} className = {props.className} options = {options} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default YearSelect;
