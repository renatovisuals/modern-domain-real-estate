import React, { Component } from 'react';
import Select from '../Select/Select';


const LotSizeSelect = (props)=> {

  const lotSizeOptions = [
    {
      content:"2000 sq ft",
      value:"2000 sq ft"
    },
    {
      content:"4500 sq ft",
      value:"4500 sq ft"
    },
    {
      content:"6500 sq ft",
      value:"6500 sq ft"
    },
    {
      content:"8000 sq ft",
      value:"8000 sq ft"
    },
    {
      content:".25 acres",
      value:".25 acres"
    },
    {
      content:".5 acres",
      value:".5 acres"
    },
    {
      content:"1 acre",
      value:"1 acre"
    },
    {
      content:"2 acres",
      value:"2 acres"
    },
    {
      content:"3 acres",
      value:"3 acres"
    },
    {
      content:"4 acres",
      value:"4 acres"
    },
    {
      content:"5 acres",
      value:"5 acres"
    },
    {
      content:"10 acres",
      value:"10 acres"
    },
    {
      content:"40 acres",
      value:"40 acres"
    },
    {
      content:"100 acres",
      value:"100 acres"
    }
  ]

  const minSqftOptions = [{content:props.label,value:""},...lotSizeOptions]
  const maxSqftOptions = [{content:props.label,value:""},...lotSizeOptions]

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


export default LotSizeSelect;
