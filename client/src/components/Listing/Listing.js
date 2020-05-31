import React from 'react';
import './listing.css'
//listingData

function Listing(props) {
    const imgAmnt = props.listingData.imageAmount;
    const { listingData } = props;
    let imgs = [];

    const getImages = ()=>{
        for( let i = 1; i<imgAmnt; i++){
            imgs.push(<li key = {i} className="box"> <img alt="listing" src = {`./images/houses/${listingData.id}/${i}.jpg`}/></li>)
            console.log(`${i}.jpg`);
        }
        return(
            <ul>
                <li className = "top-image"> <img src = {`./images/houses/${listingData.id}/main.jpg`}/> </li>
                {imgs}
            </ul>
        )
    }

    return (
        <div className = "listing-background" onClick = {props.handleClose}>
            <div className = 'listing' onClick = {props.handleClose}>
                <div className = 'image-gallery'>
                    {getImages()}
                </div>
                <div className = 'sidebar'></div>
            </div>
        </div>
    );
}

export default Listing;
