export function abbreviatePrice(price){
    if(price<1000){
        return price
    } else if(price >=1000 && price <1000000){
        return Math.round(price/1000) + "K"
    } else if (price >= 1000000){
        return Math.round(price/100000)/10+ "M"
    }
}



export const parseURL = (url)=>{
  const unStringifyNumber = (price)=>{
  if(typeof price !== "string"){
    throw new TypeError("string value required for unStringifyNumber");
  }else{
    const regex = /\d{1,}[km]/gi
    if(regex.test(price)){
      const units = {
        k:1000,
        m:1000000
      }
      const unit = price.charAt(price.length-1).toLowerCase()
      price = parseFloat(price.substring(0,price.length-1))
      price = price*units[unit]
      return price
    }
  }
  return parseFloat(price);
}

  const convertToObject = (u)=>{
    let obj = new Object
    const regex = /\/$/g
    //removing last back slash, if there is one
    u = regex.test(u) ? u.substring(0,u.length-1) : u;
    //replacing all spaces, then converting to array form
    u = u.replace("%20"," ")
      .split("/")
      .map(keyValue=>keyValue.split("="))

    for(let i=0; i<u.length; i++){
      const regex = /^[a-z]*\.(max|min)$/gi;
      if(regex.test(u[i][0])){
        const arr = u[i][0].split(".")
        const [object,key] = arr;
         obj[object] = new Object
         obj[object][key] = unStringifyNumber(u[i][1])

      }else{
        obj[u[i][0]] = u[i][1]
      }
    }
    return obj
  }

  let params = {
    ...convertToObject(url)
  }

// reformatting param values

  for(let i in params){
    let regex;
    switch(i) {
      case "mapview":
        params[i] = params[i].split(",")
        params[i] = params[i].map(val=>parseFloat(val));
        break;
      case "price":
        params[i] = params[i].split("-").map(p=>unStringifyNumber(p))
        break;
      case "beds":
        if (typeof params[i] === "string"){
          const [minimum,maximum] = params[i].split("-").map(num=>unStringifyNumber(num))
          params[i] = {};
          params[i].min = minimum;
          params[i].max = maximum;
        }
        break;
      case "property-type":
      case "listing-type":
        params[i] = params[i].split(",")

      default:

    }
}
  return params
}


export function icon(options){
    const defaultOptions = {
        outerRing:'3cc194',
        background:'373543',
        center:'3cc194',
        color:'ffffff',
        text:'300K'
    }

    if(options){
        for(let i in options){
            defaultOptions[i] = options[i];
        }
    }

    let icon = `data:image/svg+xml;charset=utf8,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1000 1000'%3E%3Cstyle%3E.st0{fill:%23${defaultOptions.background}}.st1{fill:%23${defaultOptions.outerRing}%3C/style%3E%3Cpath class='st0' d='M800.8 857.4H199.2c-4.9 0-8.9-4-8.9-8.9V632.4c0-4.9 4-8.9 8.9-8.9h601.5c4.9 0 8.9 4 8.9 8.9v216.1c.1 4.9-3.9 8.9-8.8 8.9z'/%3E%3Cimage width='437' height='504' xlink:href='data:image/png;base64,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 kXtYPhgAAAAASUVORK5CYII=' transform='translate(280 87)' overflow='visible' opacity='.76'/%3E%3Ccircle class='st0' cx='493.8' cy='301.5' r='139.8'/%3E%3Cpath class='st1' d='M493.8 128.4c-95.6 0-173.1 77.5-173.1 173.1 0 121.3 173.1 239.7 173.1 239.7s173.1-118.4 173.1-239.7c0-95.6-77.5-173.1-173.1-173.1zm0 302.3c-71.4 0-129.2-57.9-129.2-129.2s57.9-129.2 129.2-129.2S623 230.2 623 301.5s-57.8 129.2-129.2 129.2z'/%3E%3Ccircle class='st1' cx='493.8' cy='301.5' r='71'/%3E%3Cpath class='st1' d='M493.8 128.4c-95.6 0-173.1 77.5-173.1 173.1 0 121.3 173.1 239.7 173.1 239.7s173.1-118.4 173.1-239.7c0-95.6-77.5-173.1-173.1-173.1zm0 302.3c-71.4 0-129.2-57.9-129.2-129.2s57.9-129.2 129.2-129.2S623 230.2 623 301.5s-57.8 129.2-129.2 129.2z'/%3E%3Ccircle cx='493.8' cy='301.5' r='71' fill='%23${defaultOptions.center}'/%3E%3Cpath transform='rotate(45.001 493.833 653.017)' class='st0' d='M441.4 600.6h104.8v104.8H441.4z'/%3E%3Ctext transform='translate(497.000 817.388)' font-size='200.198' text-anchor='middle' font-family='Roboto-Regular' fill='%23${defaultOptions.color}'%3E${defaultOptions.text}%3C/text%3E%3C/svg%3E`

    return icon

}

export function mapStyles(){
    return(
      [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#333333"
          },
          {
              "lightness": 40
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#ffffff"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#fefefe"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#fefefe"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#b4b0b0"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#b4b0b0"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f5f5f5"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#e8e8e8"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f5f5f5"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#dedede"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#d6fcda"
          }
      ]
  },
  {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffc2c2"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "lightness": 17
          },
          {
              "visibility": "on"
          },
          {
              "color": "#62d5ae"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#cacaca"
          },
          {
              "lightness": 18
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#c6c6c6"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#d6d6d6"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f2f2f2"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#e9e9e9"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#cdf8ff"
          }
      ]
  }
]
    )
}
