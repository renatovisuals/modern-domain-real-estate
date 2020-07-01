import React from "react";
import './button.scss';

const Button = (props) => {
  const {data} = props;
    return (
      <button className = {`button ${props.className}`} onClick = {(e)=>props.onClick(e)} type = {props.type}>
       {props.content}
      </button>
    );
}

export default Button;
