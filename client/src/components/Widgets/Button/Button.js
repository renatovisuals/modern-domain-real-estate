import React from "react";
//import { Link } from 'react-router-dom';
import './button.scss';


const Button = (props) => {
  let template = null;
  const {data} = props;


    return (
      <button className = {`button ${props.className}`} onClick = {props.onClick} type = {props.type}>
       {props.content}
      </button>
    );
}

export default Button;
