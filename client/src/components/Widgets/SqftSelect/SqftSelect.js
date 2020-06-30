import React, { Component } from 'react';
import Select from '../Select/Select';


const SqftSelect = (props)=> {

  const sqftOptions = [
    {
      content:"500",
      value:500
    },
    {
      content:"750",
      value:750
    },
    {
      content:"1000",
      value:1000
    },
    {
      content:"1250",
      value:1250
    },
    {
      content:"1500",
      value:1500
    },
    {
      content:"1750",
      value:1750
    },
    {
      content:"2000",
      value:2000
    },
    {
      content:"2250",
      value:2250
    },
    {
      content:"2500",
      value:2500
    },
    {
      content:"2750",
      value:2750
    },
    {
      content:"3000",
      value:3000
    },
    {
      content:"3500",
      value:3500
    },
    {
      content:"4000",
      value:4000
    },
    {
      content:"5000",
      value:5000
    },
    {
      content:"6000",
      value:6000
    },
    {
      content:"7000",
      value:7000
    },
    {
      content:"8000",
      value:8000
    },
  ]

  const minSqftOptions = [{content:props.label,value:""},...sqftOptions]
  const maxSqftOptions = [{content:props.label,value:""},...sqftOptions]

  const options = (()=>{
    if(typeof props.type === "string"){
      if(props.type ==="max"){
        return maxSqftOptions
      }else if(props.type ==="min"){
        return minSqftOptions
      }
    }
  })()

  return(
        <Select value ={props.value}  name = {props.name} className = {props.className} options = {options} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default SqftSelect;
