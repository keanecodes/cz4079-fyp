import React, { useRef, useState, useCallback } from "react";
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { DataFilterExtension } from '@deck.gl/extensions';
import { ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import MAP_STYLE from "positron.json";
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { 
  mapOriginalData, 
  mapData,
  filterAttributes,
  borderData,
  DEFAULT_LAYER,
  layerSelection, 
  overlaySelection, 
  selectedGeojsonArea,
  UIdrawerStatOpen,
  UILoading,
  UITxtLoading,
} from 'data/recoil'

const INITIAL_VIEW_STATE = {
  latitude: 1.3451,
  longitude: 103.8198,
  zoom: 11,
  pitch: 40,
  bearing: -10
};

function getTooltip({object}) {
  const date = new Date(object?.timestamp);
  return (
    object?.resale_price &&
    `\
    Resale price: S$${object?.resale_price?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
    Floor area: ${object?.floor_area_sqm} sqm
    Transacted on: ${date?.getUTCFullYear()}-${date?.getUTCMonth() + 1}
    `
  );
}

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false
})

export default function Map({filterValue, mapStyle = MAP_STYLE}) {
  const setLoading = useSetRecoilState(UILoading)
  const setTxtLoading = useSetRecoilState(UITxtLoading)
  setTxtLoading("85%")
  const [loaded, setLoaded] = useState(false)
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);
  const originalData = useRecoilValue(mapOriginalData)
  const [filters, updateFilter] = useRecoilState(filterAttributes)
  const [data, setFilter] = useRecoilState(mapData)
  const border = useRecoilValue(borderData)
  const layerSel = useRecoilValue(layerSelection)
  const overlaySel = useRecoilValue(overlaySelection)
  const [prevLayer, setPrevLayer] = useState(DEFAULT_LAYER)
  const [selectedArea, setSelectedArea] = useRecoilState(selectedGeojsonArea)
  const openStatDrawer = useSetRecoilState(UIdrawerStatOpen)

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;
    setLoading(false)
    setTxtLoading("")
    setLoaded(true)
    
    //! Initialize an empty deck.gl layer to prevent flashing
    map.addLayer(
      new MapboxLayer({ id: `resaletimeline${prevLayer}`, deck }), // This id has to match the id of the deck.gl layer
      'place_suburbs' // Optionally define id from Mapbox layer stack under which to add deck layer
    );
    // eslint-disable-next-line
  }, [layerSel, setLoading, setTxtLoading]);

  const commonAttributes = {
    id: `resaletimeline${layerSel}`,
    data,
    radiusMinPixels: 1,
    getPosition: d => [d.longitude, d.latitude], // getPosition: d => [d.longitude, d.latitude, -d.depth * 1000],
    getRadius: d => d.floor_area_sqm, // getRadius: d => Math.pow(2, d.floor_area_sqm),
  }

  const timelineAttributes = {
    opacity: 0.3,
    getFilterValue: d => d.timestamp,
    filterRange: [filterValue[0], filterValue[1]],
    filterSoftRange: [
      filterValue[0] * 0.9 + filterValue[1] * 0.1,
      filterValue[0] * 0.1 + filterValue[1] * 0.9
    ],
    extensions: [dataFilter],
  }

  let layerAttributes = null

  switch (layerSel) {
    case 'heat':
      layerAttributes = {
        radiusPixels: 60,
        getWeight: d => d.resale_price,
        ...commonAttributes,
        ...timelineAttributes,
      }
      break;
    case 'scatter':
      layerAttributes = {
        radiusScale: 0.6,
        wrapLongitude: true,
        getFillColor: d => {
          const r = Math.sqrt(Math.max(d.resale_price, 0));
          return [255 - r * 0.3, r * 0.18, r * 0.8]; // return [255, 0, 0];
        },
        pickable: true,
        ...commonAttributes,
        ...timelineAttributes,
      }
      break;
    case 'hex': 
      layerAttributes = {
        extruded: true,
        elevationScale: 10,
        opacity: 0.8,
        radius: 509,
        coverage: 0.88,
        lowerPercentile: 50,
        getElevationWeight: d => d.resale_price,
        elevationAggregation: 'MAX',
        transitions: {
          elevationScale: 1000
        },
        ...commonAttributes,
      }
      break;
    default: break;
  }

  setTxtLoading("80%")

  const layers = glContext ? [
    data && 
      layerSel === 'scatter' 
      ? new ScatterplotLayer(layerAttributes) 
      : layerSel === 'heat' 
      ? new HeatmapLayer(layerAttributes)
      : new HexagonLayer(layerAttributes),
    border && overlaySel.length > 0 &&
      overlaySel[0].includes('Border') 
      ? new GeoJsonLayer({
        id: 'geojson',
        data: border,
        opacity: 0.8,
        stroked: true,
        filled: true,
        lineWidthMinPixels: 3,
        extruded: false,
        getFillColor: f => {
          if (selectedArea && f.properties.OBJECTID === selectedArea.OBJECTID) return [25,116,210, 255]
          return [212,218,220,255]
        },
        updateTriggers: {
          getFillColor: [selectedArea ? selectedArea.OBJECTID : null]
        },
        getLineColor: [29, 161, 242],
        pickable: true,
        autoHighlight: true,
        highlightColor: [142,223,255],
        onClick: (e) => { 
          setSelectedArea(e.object.properties)
          updateFilter({...filters, selectedArea: [e.object.properties.PLN_AREA_N]})
          openStatDrawer(true)
          // console.log(e); return true; 
        }
      }) : null
  ] : [];

  
  if (loaded) {
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;
    if (layerSel !== prevLayer) {
      if (map.getLayer(`resaletimeline${prevLayer}`)) map.removeLayer(`resaletimeline${prevLayer}`);
      setPrevLayer(layerSel)
      //! Initialize an empty deck.gl layer to prevent flashing
      map.addLayer(
        // border && overlaySel.length > 0 &&
        // new MapboxLayer({ id: 'geojson', deck }), // This id has to match the id of the deck.gl layer
        new MapboxLayer({ id: `resaletimeline${layerSel}`, deck }), // This id has to match the id of the deck.gl layer
        'place_suburbs', // Optionally define id from Mapbox layer stack under which to add deck layer
      );
    }
  }

  React.useEffect(() => {
    setFilter(
      originalData
      .filter(d => filters['room'][0] === "" ? Boolean : d['room'] === filters['room'][0])
      .filter(d => filters['flat_model'][0] === "" ? Boolean : d['flat_model'] === filters['flat_model'][0])
      .filter(d => filters['resale_price'][0] === 0 ? Boolean : d['resale_price'] >= filters['resale_price'][0] && d['resale_price'] <= filters['resale_price'][1])
      .filter(d => filters['selectedArea'][0] === "" ? Boolean : d['town'] === filters['selectedArea'][0])
    )
    
  // eslint-disable-next-line
  },[filters, selectedArea])
  

  return (
    <DeckGL
      ref={deckRef}
      onWebGLInitialized={setGLContext}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      pickable={true}
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
