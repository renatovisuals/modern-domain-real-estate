import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import './CitySection.scss';


class CitySection extends Component {


render(){
  return(
    <section className = "city-section">
      <ContentContainer>
        <SectionTitle> Choose From Any Major City In Texas </SectionTitle>
      </ContentContainer>
    </section>
  )
}

}

export default CitySection;
