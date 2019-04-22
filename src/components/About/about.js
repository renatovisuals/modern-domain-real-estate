import React, { Component } from 'react';
import Data from '../../db'

class About extends Component {


render(){
  const id = this.props.match.params.id

  console.log(Data()[0].id === Number(id))


  return(
    <div>
      this is the about component!!!!!!
      <div>  </div>
    </div>
  )
}

}

export default About;
