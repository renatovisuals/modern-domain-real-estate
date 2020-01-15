import React, { Component } from 'react';
import InfoWindow from '../InfoWindow/InfoWindow';
import { render } from 'react-dom';
import { icon, abbreviatePrice } from '../../utils'
import './map.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
        this.viewListing = this.viewListing.bind(this)
        this.state = {
          markerData:this.props.data,
          map:null,
          zoom:12,
          markers:[],
          activeMarker:null,
          infowWindow:null
        }
  }

  viewListing(){
      this.props.getListing(this.state.activeMarker)
  }

  onScriptLoad() {
      const mapOptions = {
        zoom: this.state.zoom,
        mapTypeControlOptions: {
        mapTypeIds:[]
      },
        ...this.props.options
      }

      let map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        mapOptions)




      window.google.maps.event.addListenerOnce(map,'bounds_changed',(e)=>{
        if (map.getZoom()>this.state.zoom){
          map.setZoom(this.state.zoom)
        }
      })
      window.google.maps.event.addListenerOnce(map,'idle',(e)=>{
        this.setState({
          map
        }, ()=> this.onMapLoad(this.state.map))
      })

  }

  getMapBounds(map){
    const bounds = map.getBounds()
    return ({
      north:bounds.getNorthEast().lat(),
      east:bounds.getNorthEast().lng(),
      south:bounds.getSouthWest().lat(),
      west:bounds.getSouthWest().lng()
    })
  }
  static getDerivedStateFromProps(nextProps, prevState){
    console.log("Hello")
    if(prevState.markerData !== nextProps.data){
      return {
        markerData: nextProps.data
      }
    }
    return null
  }

  createInfoWindow(e, map) {
      const infoWindow = new window.google.maps.InfoWindow({
          content: '<div id="infoWindow"></div>',
          position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          pixelOffset: new window.google.maps.Size(0,5)
      })
      infoWindow.addListener('domready', e => {
          render(<InfoWindow marker = {this.state.activeMarker} data = {this.props.data} viewListing = {this.viewListing}/>, document.getElementById('infoWindow'))
      })
      infoWindow.addListener('closeclick', e => {
          this.setState({
            infoWindow:null
          })
      })
      this.setState({
          infoWindow
      })
      this.state.infoWindow.open(map)
  }

  clearMarkers(){
      let markers = this.state.markers;
      markers.forEach((marker)=>{
          marker.setMap(null)
      })
      markers = []
      this.setState({
        markers
      })
  }

  correctZIndex(activeMarker){
  let markers = this.state.markers;
  markers.forEach((marker)=>{
    marker.setZIndex(0)
  })
  activeMarker.setZIndex(100)
  }



  onMapLoad(map){

      map.addListener('dragend',()=> this.props.onMapMove(this.getMapBounds(map)))
      map.addListener('zoom_changed',()=> this.props.onMapMove(this.getMapBounds(map)))

      map.addListener('click',()=>{
         if(this.state.infoWindow){
           this.state.infoWindow.close(this.state.map)
           this.setState({
               infoWindow:null
           })
         }
     })
      this.clearMarkers()
      this.renderMarkers(map)
  }

  renderMarkers(map){
    let bounds = new window.google.maps.LatLngBounds();
    console.log("rendermarkers called")
    this.state.markerData.forEach(house => {
        console.log(house.position,"position")
        const shorthandPrice = abbreviatePrice(house.price)
        let marker = new window.google.maps.Marker({
            map:map,
            position:house.position,
            name:house.name,
            id:house.id,
            cursor:'pointer',
            icon:{
                url: house.icon || icon({text:shorthandPrice}),
                scaledSize: new window.google.maps.Size(60, 60),
                anchor:new window.google.maps.Point(30,30)
            }
        })

        if(!this.props.options.center){
          //console.log("no center")
          bounds.extend(marker.position);
          map.fitBounds(bounds)
        }

        this.setState((prevState) => ({
            markers:[marker, ...prevState.markers]
        }));

        marker.addListener('click', e => {
            //this.onMapLoad(this.state.map)
            if(this.state.infoWindow){
                this.state.infoWindow.close()
                this.setState({
                    infoWindow:null
                })
            }
            this.createInfoWindow(e,map)
        })

        marker.addListener('mouseover', e => {
            marker.setIcon({
              url:icon({center:'2ee1ff', color:'2ee1ff', text:shorthandPrice}),
              scaledSize: new window.google.maps.Size(60,60),
              anchor: new window.google.maps.Point(30,30)
            })
            this.setState({
                activeMarker:marker
            })
            this.correctZIndex(marker)
        })

        marker.addListener('mouseout', e => {
            let closeInfoWindowWithTimeout;
            marker.setIcon({
              url:icon({center:'3cc194', text:shorthandPrice}),
              scaledSize: new window.google.maps.Size(60,60),
              anchor: new window.google.maps.Point(30,30)
            })
        })
    })

  }

//Prepending Google Maps Api Script before the React JS script in order to make full use of
//Google Maps api, rather than using the Google Maps React library which is very limited in customizability.
  componentDidMount() {
    if (!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAGgm00r51Xpx2wUfWvvKUMNWd6GrjV6Ck`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        // Below is important.
        //We cannot access google.maps until it's finished loading
        s.addEventListener('load', e => {
          this.onScriptLoad()
        })
    } else {
        this.onScriptLoad()
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.state.markerData === nextState.markerData){
      return false
    }else{
      return true
    }
  }

  componentDidUpdate(){
    console.log("updating")
    this.clearMarkers()
    this.renderMarkers(this.state.map)
    console.log(this.state,"this is the state")

  }

  render() {
    console.log("map being rendered")
    return (
      <div id={this.props.id} />
    );
  }
}

export default Map
