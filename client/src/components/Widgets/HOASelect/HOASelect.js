import React, { Component } from 'react';
import Select from '../Select/Select';


const HOASelect = (props)=> {

  const HOAOptions = [
    {
      content:"$25/month",
      value:25
    },
    {
      content:"$50/month",
      value:50
    },
    {
      content:"$75/month",
      value:75
    },
    {
      content:"$100/month",
      value:100
    },
    {
      content:"$125/month",
      value:125
    },
    {
      content:"$150/month",
      value:150
    },
    {
      content:"$175/month",
      value:175
    },
    {
      content:"$200/month",
      value:200
    },
    {
      content:"$250/month",
      value:250
    },
    {
      content:"$300/month",
      value:300
    },
    {
      content:"$350/month",
      value:350
    },
    {
      content:"$400/month",
      value:400
    },
    {
      content:"$500/month",
      value:500
    },
    {
      content:"$600/month",
      value:600
    },
    {
      content:"$700/month",
      value:700
    },
    {
      content:"$800/month",
      value:800
    },
    {
      content:"$900/month",
      value:900
    },
    {
      content:"$1000/month",
      value:1000
    }
  ]

  const options = [{content:props.label,value:""},...HOAOptions]

  return(
        <Select value ={props.value}  name = {props.name} className = {props.className} options = {options} onChange = {(e)=>props.onChange(e)}/>
  )

}

export default HOASelect;
