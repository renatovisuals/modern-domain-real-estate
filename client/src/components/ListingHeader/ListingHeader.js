import React from 'react';
import './ListingHeader.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import {formatPrice} from '../../utils';
import {formatNumber} from '../../utils';

function ListingHeader(props) {
  const {listing,headerIsHidden} = props;

  return (
    <div className = "listing-header">
      <div className = "listing-header__wrapper">
          <div className = "listing-header__address-wrapper">
            <div className = "listing-header__address">
              <span className = "listing-header__info listing-header__info--title"> {`${listing.street} ${listing.apartment ? ','+ listing.apartment : ''}`} </span>
              <span className = "listing-header__info"> {`${listing.city}, ${listing.state}`} </span>
            </div>
          </div>
          <div className = "listing-header__info-wrapper">
            <div className = "listing-header__info-container">
              <span className = "listing-header__info listing-header__info--title"> {`${formatPrice(listing.price)}`} </span>
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
              <span className = "listing-header__info listing-header__info--title"> {`${formatNumber(listing.sqft)}`} </span>
              <span className = "listing-header__info"> Sqft </span>
            </div>
          </div>
      </div>
    </div>
  );
}


export default ListingHeader;
