import axios from "axios";

export const settings = {
  style: "mapbox://styles/mapbox/streets-v11",
  antialias: true, // stylesheet location
  center: [103.8198, 1.3121],
  // zoom: 11,
  zoom: 12,
  bearing: -20,
  pitch: 60,
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
  map.addSource('mapDat', {
    'type': 'geojson',
    'data': {...mapDat},
  })
  map.addLayer({
    'id': 'mapDat',
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
  map.on('mousemove', 'mapDat', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    popup
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.PLN_AREA_N)
    .addTo(map);
  });
  
  map.on('mouseleave', 'mapDat', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

export const enableMapClick = map => {
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

  map.on('click', function (e) {
    map.getCanvas().style.cursor = 'pointer';
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['mapDat']
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