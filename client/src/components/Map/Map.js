import React, { Component } from 'react';
import InfoWindow from '../InfoWindow/InfoWindow';
import MarkerClusterer from "@google/markerclusterer";
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
          markerCluster:null,
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

  clearMarkers(callback){
      let markers = [...this.state.markers]
      markers.forEach((marker)=>{
          marker.setMap(null);
          marker = null;
      })
      this.setState({
        markers
      },()=>{
        this.setState({
          markers:[]
        },()=>callback())
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

      this.clearMarkers(()=>this.renderMarkers(map))

  }

  loadClusters(map,markers){
    const options = {
      imagePath:'http://localhost:3000/images/m',
      //imageExtension:'png',
      minimumClusterSize:2,
      gridSize:500,
      zoomOnClick:true,
      averageCenter:true,
      zIndex:1000,
      styles:[
        {
          url:"http://localhost:3000/images/m1.png",
          textColor:"#ffffff",
          textSize:13,
          height:35,
          width:35
        },
        {
          url:"http://localhost:3000/images/m1.png",
          height:35,
          width:35
        },
        {
          url:"http://localhost:3000/images/m1.png",
          height:35,
          width:35
        },
        {
          url:"http://localhost:3000/images/m1.png",
          height:35,
          width:35
        },
        {
          url:"http://localhost:3000/images/m1.png",
          height:35,
          width:35
        }

      ]
    }

    MarkerClusterer.prototype.onRemove = function () {
    this.setReady_(true);
    };

    if(this.state.markerCluster){
      this.state.markerCluster.clearMarkers()
      this.state.markerCluster.setMap(null)
      this.setState({
        markerCluster:null
      })
    }

    this.setState({
      markerCluster: new MarkerClusterer(map,markers,options)
    })

  }

  renderMarkers(map){
    const markers = []
    let bounds = new window.google.maps.LatLngBounds();
    this.state.markerData.forEach(house => {
        const shorthandPrice = abbreviatePrice(house.price)
        const position = {
          lat:house.pos_lat,
          lng:house.pos_lng
        }
        let marker = new window.google.maps.Marker({
            map:map,
            position:position,
            name:house.name,
            id:house.listing_id,
            cursor:'pointer',
            icon:{
                url: house.icon || icon({text:shorthandPrice}),
                scaledSize: new window.google.maps.Size(60, 60),
                anchor:new window.google.maps.Point(30,30)
            }
        })

        //if center exists in options, override the marker based map positioning
        if(!this.props.options.center){
          bounds.extend(marker.position);
          //if only one marker on map, extend the bounds to zoom further out
          if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            var extendPoint1 = new window.google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
            var extendPoint2 = new window.google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
          }
          map.fitBounds(bounds)
        }
        map.fitBounds(bounds)

        marker.addListener('click', e => {
            if(this.state.infoWindow){
                this.state.infoWindow.close()
                this.setState({
                    infoWindow:null
                })
            }
            this.setState({
              activeMarker:marker
            })
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

        markers.push(marker)
    })

    this.setState((prevState)=>({
      markers
    }),()=>{
      this.loadClusters(map,this.state.markers)
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
    console.log("UPDATED")
    this.clearMarkers(()=>this.renderMarkers(this.state.map))
    console.log(this.state.markers,"markers in update function")
    this.loadClusters(this.state.map,this.state.markers);
  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
}

export default Map
