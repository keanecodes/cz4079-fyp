import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer} from '@deck.gl/layers';
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import {scaleLog} from 'd3-scale';
import {h3ToGeo} from 'h3-js';
import resale1k from "data/resale_1k.csv"

import {load} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';


const colorScale = scaleLog()
  .domain([10, 100, 1000, 10000])
  .range([[255, 255, 178], [254, 204, 92], [253, 141, 60], [227, 26, 28]]);

export async function renderDeckglLayers(map) {

  const data = await load(resale1k, CSVLoader)
  // console.log(data)

  let selectedPOICentroid;
  
  const arcLayer = new MapboxLayer({
    id: 'deckgl-connections',
    type: ArcLayer,
    data: [],
    getSourcePosition: d => selectedPOICentroid,
    getTargetPosition: d => [d.longitude, d.latitude],
    getSourceColor: [255, 0, 128],
    getTargetColor: [0, 200, 255],
    getWidth: d => Math.max(2, d.count / 10)
  });

  const selectPOI = hex => {
    const [lat, lng] = h3ToGeo(hex);
    selectedPOICentroid = [lng, lat];
    arcLayer.setProps({
      data: data.filter(d => d.hex === hex)
    });
  };

  // eslint-disable-next-line
  const poiLayer = new MapboxLayer({
    id: 'deckgl-pois',
    type: H3HexagonLayer,
    data: aggregateHexes(data),
    opacity: 0.4,
    pickable: true,
    autoHighlight: true,
    onClick: ({object}) => object && selectPOI(object.hex),
    getHexagon: d => d.hex,
    getFillColor: d => colorScale(d.count),
    extruded: false,
    stroked: false
  });

  // map.addLayer(poiLayer, getFirstLabelLayerId(map.getStyle()));
  // map.addLayer(arcLayer);

  // selectPOI('8a283082aa17fff');
  const heatmap = new MapboxLayer({
    id: 'heat',
    type: HeatmapLayer,
    data: data,
    getPosition: d => [d.longitude, d.latitude],
    getWeight: d => d.resale_price,
    radiusPixels: 60,
  });

  const hexagon = new MapboxLayer({
    id: 'hex',
    type: HexagonLayer,
    data: data,
    getPosition: d => [d.longitude, d.latitude],
    getElevationWeight: d => d.resale_price,
    elevationScale: 80,
    extruded: true,
    radius: 509,         
    opacity: 0.6,        
    coverage: 0.88,
    lowerPercentile: 50,
    transitions: {
      elevationScale: 1000
    }
});

  map.addLayer(heatmap);
  map.addLayer(hexagon);
}

function aggregateHexes(data) {
  const result = {};
  for (const object of data) {
    if (!result[object.hex]) {
      result[object.hex] = {hex: object.hex, count: 0};
    }
    result[object.hex].count += object.count;
  }
  return Object.values(result);
}

// eslint-disable-next-line
function getFirstLabelLayerId(style) {
  const layers = style.layers;
  // Find the index of the first symbol (i.e. label) layer in the map style
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      return layers[i].id;
    }
  }
  return undefined;
}