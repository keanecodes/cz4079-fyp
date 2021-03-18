////////// DEPENDENCIES //////////
import React, { useRef, useState, useCallback } from "react";
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { DataFilterExtension } from '@deck.gl/extensions';
import { ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

//////////! DATA !//////////
import MAP_STYLE from "positron.json";

const INITIAL_VIEW_STATE = {
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

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false
})

export default function Map({show3D, data, filterValue, mapStyle = MAP_STYLE}) {
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;

    //! Initialize an empty deck.gl layer to prevent flashing
    map.addLayer(
      new MapboxLayer({ id: "resaletimeline", deck }), // This id has to match the id of the deck.gl layer
      'place_suburbs' // Optionally define id from Mapbox layer stack under which to add deck layer
    );
  }, []);
  
  const layers = glContext ? [
    data &&
      new ScatterplotLayer({
        id: 'resaletimeline',
        data,
        opacity: 0.3,
        radiusScale: 0.6,
        radiusMinPixels: 1,
        wrapLongitude: true,
        getPosition: d => [d.longitude, d.latitude], // getPosition: d => [d.longitude, d.latitude, -d.depth * 1000],
        getRadius: d => d.floor_area_sqm, // getRadius: d => Math.pow(2, d.floor_area_sqm),
        getFillColor: d => {
          const r = Math.sqrt(Math.max(d.resale_price, 0));
          return [255 - r * 0.3, r * 0.18, r * 0.8]; // return [255, 0, 0];
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
  ] : [];

  return (
    <DeckGL
      ref={deckRef}
      onWebGLInitialized={setGLContext}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
      glOptions={{ stencil: true }} /* To render vector tile polygons correctly */
    >
      {glContext && (
        <StaticMap 
          ref={mapRef}
          gl={glContext}
          mapStyle={mapStyle} 
          preventStyleDiffing={true} 
          attributionControl={false}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onLoad={onMapLoad}
        />
      )}
    </DeckGL>
);
};
