import axios from "axios";
import { renderDeckglLayers, addScatterTimeline } from "./deckgl";
import mapboxgl from "mapbox-gl";
import singmap from "data/MP14_PLNG_AREA_WEB_PL.geojson"

export const settings = {
  style: "mapbox://styles/mapbox/light-v10",
  antialias: true, // stylesheet location
  center: [103.8198, 1.3121],
  // zoom: 11,
  // zoom: 12,
  // bearing: -10,
  // pitch: 60,
  attributionControl: false
}

export const fetchData = source => {
  return axios
    .get(source)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const loadInitialPolygon = (map, mapDat) => {
  if(!map.getSource('mapDat')) 
    map.addSource('mapDat', {
      'type': 'geojson',
      'data': {...mapDat},
    })
  
  if(!map.getLayer('mapDat-lyr')) 
    map.addLayer({
      'id': 'mapDat-lyr',
      'type': 'fill',
      'source': 'mapDat',
      'layout': {},
      'paint': {
        'fill-color': '#088',
        "fill-outline-color": "#fff",
        'fill-opacity': 0.8
      }
    },'settlement-label');
}

export const enableMapHover = (map, popup) => {  
  map.on('mousemove', 'mapDat-lyr', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    popup
    .setLngLat(e.lngLat)
    .setHTML(`<span style='color:black'>${e.features[0].properties.PLN_AREA_N}</span>`)
    .addTo(map);
  });
  
  map.on('mouseleave', 'mapDat-lyr', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

export const enableMapClick = map => {
  if(!map.getLayer('mapDat-highlighted')) 
    map.addLayer({
      'id': 'mapDat-highlighted',
      'type': 'fill',
      'source': 'mapDat',
      'paint': {
        'fill-outline-color': '#484896',
        'fill-color': '#6e599f',
        'fill-opacity': 0.75
      },
      'filter': ['in', 'FIPS', '']
      }, 'settlement-label'
    ); // Place polygon under these labels.

  map.on('click', 'mapDat-lyr', function (e) {
    map.getCanvas().style.cursor = 'pointer';
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['mapDat-lyr']
    });
    var filter = features.reduce(
      function (memo, feature) {
        memo.push(feature.properties.PLN_AREA_N);
        return memo;
      },
      ['in', 'PLN_AREA_N']
    );
       
      map.setFilter('mapDat-highlighted', filter);
  });
}

export const enable3d = map => {
  if (!map.getLayer('3d-buildings'))
    map.addLayer({
      id: '3d-buildings',
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 10,
      paint: {
        'fill-extrusion-color': '#ccc',
        'fill-extrusion-height': ['get', 'height']
      }
    });
}

export const enable3DToggle = (map, show3D, data, filterValue) => {
  if(show3D) {
    map.off('click', 'mapDat-lyr');
    map.off('mousemove', 'mapDat-lyr');
    map.off('mouseleave', 'mapDat-lyr');
    if (map.getLayer('mapDat-lyr')) map.removeLayer('mapDat-lyr');
    if (map.getLayer('mapDat-highlighted')) map.removeLayer('mapDat-highlighted');
    if (map.getSource('mapDat')) map.removeSource('mapDat');
    if (map.getLayer('heat')) map.removeLayer('heat');
    if (map.getLayer('scatter')) map.removeLayer('scatter');

    renderDeckglLayers(map, data);
    enable3d(map);
    map.flyTo({
      center: [103.8198, 1.3121],
      zoom: 12,
      bearing: -12,
      pitch: 60,
      speed: 1, // make the flying slow
      curve: 1, // change the speed at which it zooms out
      easing: function (t) { return t },
      essential: true
    });
  } else {  
    if (map.getLayer('3d-buildings')) map.removeLayer('3d-buildings');
    if (map.getLayer('hex')) map.removeLayer('hex');
    if (map.getLayer('heat')) map.removeLayer('heat');

    fetchData(singmap).then(data => {
      loadInitialPolygon(map, data);
      enableMapClick(map);
      
      // const classes = useStyles();
      enableMapHover(map, new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      }));
      
    });
    data && addScatterTimeline(data, map, filterValue);
    
    map.flyTo({
      // These options control the ending camera position: centered at
      // the target, at zoom level 9, and north up.
      center: [103.8198, 1.3121],
      zoom: 10.5,
      // center: [-120, 36.5],
      // zoom: 5.5,
      bearing: 0,
      pitch: 0,
      
      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 1, // make the flying slow
      curve: 1, // change the speed at which it zooms out
      
      // This can be any easing function: it takes a number between
      // 0 and 1 and returns another number between 0 and 1.
      easing: function (t) { return t },
      
      // this animation is considered essential with respect to prefers-reduced-motion
      essential: true
    });
  }
}