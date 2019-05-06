import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SectionTitle from '../SectionTitle/SectionTitle';
import data from '../../db';
import './NewestListingSection.scss';
import ListingCard from '../ListingCard/ListingCard';


class NewestListingSection extends Component {

getData(){
const houses = data.houses;
let arr = new Array;

for(let i = 0; i<1; i++){
  arr.push(<ListingCard data = {houses[i]}/>)
}
return arr;
}

render(){
  console.log(this.getData(), "this is the getdata funtion")

  return(
    <section className = "new-listings">
      <ContentContainer narrow>
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
