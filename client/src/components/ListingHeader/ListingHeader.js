import React from 'react';
import './ListingHeader.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

function ListingHeader(props) {
  const {listing} = props;
  return (
    <div className = "listing-header">
      <ContentContainer className = "listing-header__content-container">
          <div>
            <span className = "listing-header__street"> {`${listing.street} ${listing.apartment ? ','+ listing.apartment : ''}`} </span>
            <span className = "listing-header__city-state"> {`${listing.city}, ${listing.state}`} </span>
          </div>
          <div className = "listing-header__header-info">
            <span className = "listing-header__street"> {`${listing.street} ${listing.apartment ? ','+ listing.apartment : ''}`} </span>
            <span className = "listing-header__city-state"> {`${listing.city}, ${listing.state}`} </span>
          </div>

      </ContentContainer>
    </div>
  );
}


export default ListingHeader;
