import React, { Component } from 'react';
import './ListingDataTable.scss';
import axios from 'axios';

class ListingDataTable extends Component {
  state = {

  }

  componentDidMount(){
    if(this.props.data.airConditioning){
      //const
    }
  }

  renderTableData = ()=>{
    const dataToShow = {
      'listing_type':'Type',
      'bathrooms':'Bathrooms',
      'cooling':'Cooling',
      'year_built':'Year Built',
      'heating':'Heating',
      'parking':'Parking',
    }
    let tableData = [];
    let data = {}
    for (let i in dataToShow){
      if(this.props.data[i]){
        data[dataToShow[i]] = this.props.data[i]
      }else{
        data[dataToShow[i]] = '-'
      }
    }
    for (let i in data){
      tableData.push(
        <tr>
          <th>{i}</th>
          <td>{data[i]}</td>
        </tr>
      )
    }
    return tableData;
  }

  render(){
    console.log(this.props.data)
    return (
        <div className = "listing-data-table">
          <table>
          {this.renderTableData()}
          </table>
        </div>
    );
  }
}

export default ListingDataTable;
