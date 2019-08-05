import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import Button from '../Widgets/Button/Button';
import SocialMedia from '../Widgets/SocialMedia/SocialMedia';
import './QuickHomeSearch.scss';
import data from '../../db';


class QuickHomeSearch extends Component{
   state = {

   }

    render(){
      return(
          <div className = {`${this.props.className} quick-home-search`}>
            <div className = "quick-home-search__container">
              <h1 className = 'quick-home-search__title'> Find a home</h1>
              <form className = "quick-home-search__form">
                <label htmlFor = "quick-search-city" className = "quick-home-search__form-label"> City </label>
                <Select
                  name = "quick-search-city"
                  className = "quick-home-search__select"
                  options = {[
                    {
                      value:'Fort Worth',
                      content:'Fort Worth'
                    },
                    {
                      value:'Granbury',
                      content:'Granbury'
                    }
                  ]}
                />
                <label htmlFor = "quick-search-bedrooms" className = "quick-home-search__form-label"> Bedrooms </label>
                <Select
                  name = "quick-search-bedrooms"
                  className = "quick-home-search__select"
                  options = {[
                    {
                      value:1,
                      content:'1+'
                    },
                    {
                      value:2,
                      content:'2+'
                    }
                  ]}
                />
                <label htmlFor = "quick-search-bathrooms" className = "quick-home-search__form-label"> Bathrooms </label>
                <Select
                  name = "quick-search-bathrooms"
                  className = "quick-home-search__select"
                  options = {[
                    {
                      value:1,
                      content:'1+'
                    },
                    {
                      value:2,
                      content:'2+'
                    }
                  ]}
                />
                <Button className = "quick-home-search__submit-btn" content = "Find Your Home!" onClick = {(e)=>{e.preventDefault()}}/>
              </form>
              <div>
                <h1 className = "quick-home-search__title"> Contact Us</h1>
                <p className = "quick-home-search__contact-type"> <span className = "quick-home-search__contact-title">Email:</span> homes@moderndomain.com </p>
                <p className = "quick-home-search__contact-type"> <span className = "quick-home-search__contact-title">Phone:</span> (817)473-0115 </p>
                <p className = "quick-home-search__contact-type"> <span className = "quick-home-search__contact-title">Address:</span> 2210 Main St, Fort Worth, Tx, 76107 </p>
              </div>
              <div>
                <h1 className = "quick-home-search__title"> Follow Us </h1>
                <SocialMedia centered = {true} className = "quick-home-search__social-media"/>
              </div>
            </div>
          </div>
      )
    }
};

export default QuickHomeSearch;
