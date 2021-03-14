// import React, { useEffect, useRef, useState } from "react";
import React from "react";
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {DataFilterExtension} from '@deck.gl/extensions';
import { ScatterplotLayer } from '@deck.gl/layers';

import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "mapbox-gl";
// import { 
//   settings, 
//   enable3DToggle
// } from "./mapbox";


const INITIAL_VIEW_STATE = {
  // latitude: 36.5,
  // longitude: -120,
  // zoom: 5.5,
  latitude: 1.3121,
  longitude: 103.8198,
  zoom: 11,
  pitch: 0,
  bearing: 0
};

function getTooltip({object}) {
  const date = new Date(object?.timestamp);
  return (
    object &&
    `\
    Resale price: S$${object.resale_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
    Floor area: ${object.floor_area_sqm} sqm
    Transacted on: ${date.getUTCFullYear()}-${date.getUTCMonth() + 1}
    `
  );
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false
})

export default function Map({show3D, data, filterValue, mapStyle = MAP_STYLE}) {
  // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  // const [map, setMap] = useState(null);
  // const mapContainer = useRef(null);
  
  const layers = [
    data &&
      new ScatterplotLayer({
        id: 'earthquakes',
        data,
        opacity: 0.3,
        radiusScale: 0.6,
        radiusMinPixels: 1,
        wrapLongitude: true,

        // getPosition: d => [d.longitude, d.latitude, -d.depth * 1000],
        // getRadius: d => Math.pow(2, d.floor_area_sqm),
        getPosition: d => [d.longitude, d.latitude],
        getRadius: d => d.floor_area_sqm,
        getFillColor: d => {
          const r = Math.sqrt(Math.max(d.resale_price, 0));
          return [255 - r * 0.3, r * 0.18, r * 0.8];
          // return [255, 0, 0];
        },

        getFilterValue: d => d.timestamp,
        filterRange: [filterValue[0], filterValue[1]],
        filterSoftRange: [
          filterValue[0] * 0.9 + filterValue[1] * 0.1,
          filterValue[0] * 0.1 + filterValue[1] * 0.9
        ],
        extensions: [dataFilter],

        pickable: true
      })
  ];

  // useEffect(() => {
    // const initializeMap = ({ setMap, mapContainer }) => {
    //   const map = new mapboxgl.Map({
    //     container: mapContainer.current,
    //     ...settings,
    //     zoom: show3D ? 12 : 10.5 ,
    //     bearing: show3D ? -10 : 0,
    //     pitch: show3D ? 60 : 0,
    //   });
  
    //   map.on("load", () => {        
    //     setMap(map);
    //     map.resize();
    //   });
    // };

    // if (!map) initializeMap({ setMap, mapContainer });

    // if (map) {
    //   enable3DToggle(map, show3D, data, filterValue);
    // }
  // }, [map, show3D, data, filterValue]);

  // return <div id="map" ref={el => (mapContainer.current = el)}/>;
  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <StaticMap 
        reuseMaps 
        mapStyle={mapStyle} 
        preventStyleDiffing={true} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
);
};
