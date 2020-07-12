import React from 'react';
import Nav from '../Nav/Nav';
import './listing.css';

function Listing(props) {



    return (
        <div className = "listing" onClick = {props.handleClose}>
        <Nav/>
            THIS IS A LISTING {props.match.params.id ? `${props.match.params.id}` : null}
        </div>
    );
}

export default Listing;
