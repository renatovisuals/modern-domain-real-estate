import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import data from '../../db';
import './NewestListingSection.scss';
import ListingCard from '../ListingCard/ListingCard';
import Card from '../Widgets/Card/Card';


class NewestListingSection extends Component {

getData(){
const houses = data.agents;
let arr = new Array;

for(let i = 0; i<4; i++){
  arr.push(<Card type ="agent" data = {houses[i]} />)
}
return arr;
}

render(){
  console.log(this.getData(), "this is the getdata funtion")

  return(
    <section className = "new-listings">
      <ContentContainer>
        <SectionTitle> Newest Listings </SectionTitle>
        <div className = "new-listings__listing-container">
          {this.getData()}
        </div>
      </ContentContainer>
    </section>
  )
}

}

export default NewestListingSection;
