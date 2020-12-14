import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import './FormTextInput.scss';


const FormTextInput = (props)=> {

  const renderErrorMsg = ()=>{
    if(props.error){
      return <p className = "form-text-input__error-message">{props.errorMessage}</p>
    }else{
      return null
    }
  }

  return(

      <div className = {`form-text-input ${props.error ? 'form-text-input--error':''}`}>
        <TextInput
          className = {props.className}
          size = {props.size}
          name = {props.name}
          placeholder = {props.placeholder}
          value = {props.value}
          onChange={props.onChange}
        />
        {renderErrorMsg()}

      </div>
  )
}

export default FormTextInput;
