import React from 'react';
import './ListingHeader.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import {priceToString} from '../../utils';

function ListingHeader(props) {
  const {listing} = props;
//  const sqft = ()=>{
//    const string = listing.
//    return stringToSqft()
//  }
  return (
    <div className = "listing-header">
      <ContentContainer className = "listing-header__content-container">
          <div>
            <span className = "listing-header__info listing-header__info--title"> {`${listing.street} ${listing.apartment ? ','+ listing.apartment : ''}`} </span>
            <span className = "listing-header__info"> {`${listing.city}, ${listing.state}`} </span>
          </div>
          <div className = "listing-header__info-wrapper">
            <div className = "listing-header__info-container">
              <span className = "listing-header__info listing-header__info--title"> {`${priceToString(listing.price)}`} </span>
              <span className = "listing-header__info"> Price </span>
            </div>
            <div className = "listing-header__info-container">
              <span className = "listing-header__info listing-header__info--title"> {`${listing.bedrooms}`} </span>
              <span className = "listing-header__info"> Beds </span>
            </div>
            <div className = "listing-header__info-container">
              <span className = "listing-header__info listing-header__info--title"> {`${listing.bathrooms}`} </span>
              <span className = "listing-header__info"> Baths </span>
            </div>
            <div className = "listing-header__info-container">
              <span className = "listing-header__info listing-header__info--title"> {`${listing.sqft}`} </span>
              <span className = "listing-header__info"> Sqft </span>
            </div>
          </div>

      </ContentContainer>
    </div>
  );
}


export default ListingHeader;
