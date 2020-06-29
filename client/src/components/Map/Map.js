import React, { Component } from 'react';
import InfoWindow from '../InfoWindow/InfoWindow';
import MarkerClusterer from "@google/markerclusterer";
import { render } from 'react-dom';
import { icon, abbreviatePrice } from '../../utils';
import './map.css';
import { arraysMatch } from '../../utils';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
        this.viewListing = this.viewListing.bind(this)
        this.state = {
          markerData:this.props.data,
          markerCluster:null,
          map:null,
          markers:[],
          activeMarker:null,
          hoveredListing:null,
          infoWindow:null
        }
  }

  viewListing(){
      this.props.getListing(this.state.activeMarker)
  }

  onScriptLoad() {
      const mapOptions = {
        zoom: this.state.zoom,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControlOptions: {
        mapTypeIds:[]
      },
        ...this.props.options
      }

      let map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        mapOptions)

      console.log(map,"HELLLO")

      window.google.maps.event.addListenerOnce(map,'idle',(e)=>{
          this.setState({
            map
          }, ()=>this.onMapLoad(this.state.map))
      })

  }

  getMapBounds = (map)=>{
      const bounds = map.getBounds()
      return ({
        north:bounds.getNorthEast().lat(),
        east:bounds.getNorthEast().lng(),
        south:bounds.getSouthWest().lat(),
        west:bounds.getSouthWest().lng()
      })
  }

  updateMapBounds = (bounds)=>{
    this.props.updateMapBounds(bounds)
    console.log(this.state.markers,"MARKERS")
  }

  setMapBounds = (map,bounds,callback)=>{
      console.log("set map bounds called")
      let search = this.getSearchParams()
      const ne = new window.google.maps.LatLng(bounds[0], bounds[1]);
      const sw = new window.google.maps.LatLng(bounds[2], bounds[3]);
      const boundsNew = new window.google.maps.LatLngBounds(sw,ne);
      map.setCenter(boundsNew.getCenter())
      if(search.mapZoom){
        map.setZoom(parseFloat(search.mapZoom))
      }
      if(callback) callback()
  }

  changeZoomState = (map)=>{
    let search = this.getSearchParams()
    search.mapZoom = map.getZoom()
    this.props.history.push({
      search:queryString.stringify(search,{arrayFormat:'comma'})
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.markerData !== nextProps.data){
      return {
        markerData: nextProps.data
      }
    }
    if(prevState.hoveredListing !== nextProps.activeListing){
      return {
        hoveredListing:nextProps.activeListing
      }
    }
    return null
  }

  createInfoWindow(e,map) {
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
        },()=>{if(callback)callback()})
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
      let search = this.getSearchParams();
      map.addListener('dragend',()=> this.updateMapBounds(this.getMapBounds(map)))
      map.addListener('zoom_changed',()=>{this.updateMapBounds(this.getMapBounds(map))})
      map.addListener('zoom_changed', ()=>this.changeZoomState(map))
      map.addListener('center_changed', this.getMarkersInBounds)
      map.addListener('zoom_changed',this.getMarkersInBounds)
      window.addEventListener('resize',this.getMarkersInBounds)

      map.addListener('click',()=>{
         if(this.state.infoWindow){
           this.state.infoWindow.close(this.state.map)
           this.setState({
               infoWindow:null
           })
         }
     })
      if(this.state.markerData.length === 0){
        this.clearMarkers(this.loadClusters(this.state.map,[]))
        if(search.mapBounds)this.setMapBounds(this.state.map,search.mapBounds)
        return
      }

      let shouldFitBounds = search.mapBounds ? false : true;
      console.log(shouldFitBounds, "re-rendering")
        this.renderMarkers(this.state.map,shouldFitBounds,()=>{
          if(search.mapBounds)this.setMapBounds(this.state.map,search.mapBounds)
        })

  }

  loadClusters(map,markers){
    const options = {
      imagePath:'http://localhost:3000/images/m',
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
      this.setState({
        markerCluster:null
      })
    }
    this.setState({
      markerCluster:new MarkerClusterer(map,markers,options)
    })
  }

  getMarkersInBounds = debounce(()=>{
      const markersInBounds = []
    if(this.state.map.getBounds()){
      for(let i=0; i< this.state.markers.length; i++){
        if(this.state.map.getBounds().contains(this.state.markers[i].getPosition())){
          markersInBounds.push(this.state.markers[i])
        }
      }
    }
    this.props.setMarkersInBounds(markersInBounds)
  },300)

  renderMarkers(map,shouldFitBounds,callback){
    if(this.state.markerData.length === 0){
      const bounds = this.getSearchParams().mapBounds
      this.clearMarkers(()=>console.log("cleared markers"))
      this.getMarkersInBounds()
      this.setMapBounds(map,bounds)
      return
    }
    const markers = []
    let bounds = new window.google.maps.LatLngBounds();
    this.clearMarkers(()=>{
      this.state.markerData.forEach(house => {
          const shorthandPrice = abbreviatePrice(house.price)
          const position = {
            lat:parseFloat(house.pos_lat),
            lng:parseFloat(house.pos_lng)
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

          marker.listingData = house;

          if(shouldFitBounds){
            bounds.extend(marker.position);
            //if only one marker on map, extend the bounds to zoom further out
            if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
              var extendPoint1 = new window.google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
              var extendPoint2 = new window.google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
              bounds.extend(extendPoint1);
              bounds.extend(extendPoint2);
            }
            map.fitBounds(bounds)
            this.getMarkersInBounds()
          }
            //map.fitBounds(bounds)
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
              //this.selectMarker(null,marker)
              if(!this.state.infoWindow)this.props.setActiveListing(marker.id)
              this.setState({
                  activeMarker:marker,
                  //hoveredListing:marker.id
              })
              this.correctZIndex(marker)
          })

          marker.addListener('mouseout', e => {
              //let closeInfoWindowWithTimeout;
              this.props.removeActiveListing(marker.id)
          })

          markers.push(marker)
      })

      this.setState((prevState)=>({
        markers
      }),()=>{
        this.loadClusters(map,this.state.markers)
        //this.getMarkersInBounds()
        if(callback)callback()
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
        //s.setAttribute('crossorigin',"use-credentials")
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

  selectMarker = (markerId)=>{
    let index;
    const newMarker = this.state.markers.find((marker,i)=>{
      index = i
      return marker.id === markerId
    })
    if(newMarker){
      newMarker.setIcon({
        url:icon({center:'2ee1ff', color:'2ee1ff', text:abbreviatePrice(newMarker.listingData.price)}),
        scaledSize: new window.google.maps.Size(65,65),
        anchor: new window.google.maps.Point(32,32)
      })
    }
  }

  deselectMarker = (markerId)=>{
    if(markerId){
      let index;
      const newMarker = this.state.markers.find((marker,i)=>{
        index = i
        return marker.id === markerId
      })
    if(newMarker){
      newMarker.setIcon({
        url:icon({center:'3cc194', text:abbreviatePrice(newMarker.listingData.price)}),
        scaledSize: new window.google.maps.Size(60,60),
        anchor: new window.google.maps.Point(30,30)
      })
    }
    }
  }

  getSearchParams = ()=>{
    let search = queryString.parse(this.props.history.location.search,{arrayFormat:'comma'})
    return search
  }

  componentDidUpdate(prevProps,prevState){
    //console.log(this.state.markerData,this.state.markers,"this is the new marker data")
    if(!arraysMatch(prevState.markerData,this.state.markerData) && this.state.map){
      console.log("RUNNING")
      this.onMapLoad(this.state.map)
      //console.log("this is a test")
      //let search = this.getSearchParams();
      //console.log(search,"THIS IS THE SEARCH ON CHANGE")
      //let shouldFitBounds = search.mapBounds ? false : true;
      //  this.renderMarkers(this.state.map,shouldFitBounds,()=>{
      //    if(search.mapBounds)this.setMapBounds(this.state.map,search.mapBounds,this.getMarkersInBounds)
      //  })
    //  this.clearMarkers(()=>this.renderMarkers(this.state.map,{fitBounds:shouldFitBounds},()=>{
    //    if(search.mapBounds)this.setMapBounds(this.state.map,search.mapBounds)
    // }))

      //this.loadClusters(this.state.map,this.state.markers);

    }
    if(this.state.hoveredListing !== prevState.hoveredListing){
      if(this.state.hoveredListing !== null){
        this.deselectMarker(prevState.hoveredListing)
        this.selectMarker(this.state.hoveredListing)
      }else{
        this.deselectMarker(prevState.hoveredListing)
      }

    }
  }

  componentWillUnmount(){
      window.removeEventListener('resize',this.getMarkersInBounds)
  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
}

export default withRouter(Map);
