import React, { Component } from 'react';
import Select from '../Select/Select';


const PriceSelect = (props)=> {

  const priceOptions = [
    {
      content:"100,000",
      value:100000
    },
    {
      content:"125,000",
      value:125000
    },
    {
      content:"150,000",
      value:150000
    },
    {
      content:"15,000,000",
      value:15000000
    },
    {
      content:"500,000",
      value:500000
    }
  ]
  const minPriceOptions = [{content:props.label,value:""},...priceOptions]
  const maxPriceOptions = [{content:props.label,value:""},...priceOptions]

  const options = (()=>{
    if(typeof props.type === "string"){
      if(props.type ==="max"){
        return maxPriceOptions
      }else if(props.type ==="min"){
        return minPriceOptions
      }
    }
  })()

  return(
        <Select value ={props.value} label = {props.label} name = {props.name} className = {props.className} options = {options} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default PriceSelect;
