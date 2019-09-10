import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import { Link } from 'react-router-dom';
import './AgentHeader.scss';


const AgentHeader = (props)=> {
  console.log(props,"THESE ARE THE PROPS")
  const getQualifications = ()=>{
    let certs;
    if(props.data.qualifications.length === 1){
      certs = <span className = "agent-header__qualification"> {props.data.qualifications[0]} </span>
    }else{
      certs = props.data.qualifications.map((cert, i)=>{
        if(i === props.data.qualifications.length-1){
          return <span className = "agent-header__qualification"> {`${cert}`} </span>
        }else{
          return <span className = "agent-header__qualification"> {`${cert} |`} </span>
        }
      })
    }
    return certs;
  }

  return(
    <div className = "agent-header">
      <ContentContainer>
        <div className = "agent-header__content">
          <div className = "agent-header__image" style={{background:`url('/images/agents/${props.data.image}')`, backgroundSize:'cover'}}> </div>
          <div className = "agent-header__description">
            <span className = "agent-header__agent-name"> {`${props.data.firstName} ${props.data.lastName}`} </span>
            <span className = "agent-header__agent-phone"> {`${props.data.phone}`} </span>
            <div className = "agent-header__agent-qualifications"> {getQualifications()} </div>
          </div>
          <button className = "agent-header__btn" onClick = {()=> props.toggleModal()}>
            Work With {`${props.data.firstName} ${props.data.lastName}`}
          </button>
        </div>
      </ContentContainer>
    </div>
  )

}

export default AgentHeader;
