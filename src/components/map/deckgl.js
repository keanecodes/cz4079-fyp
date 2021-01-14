import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer} from '@deck.gl/layers';
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import {scaleLog} from 'd3-scale';
import {h3ToGeo} from 'h3-js';


import {load} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';


const colorScale = scaleLog()
  .domain([10, 100, 1000, 10000])
  .range([[255, 255, 178], [254, 204, 92], [253, 141, 60], [227, 26, 28]]);

export async function renderDeckglLayers(map) {

  const data = await load('https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/safegraph/sf-pois.csv', CSVLoader)

  let selectedPOICentroid;
  
  const arcLayer = new MapboxLayer({
    id: 'deckgl-connections',
    type: ArcLayer,
    data: [],
    getSourcePosition: d => selectedPOICentroid,
    getTargetPosition: d => [d.home_lng, d.home_lat],
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

  map.addLayer(poiLayer, getFirstLabelLayerId(map.getStyle()));
  map.addLayer(arcLayer);

  selectPOI('8a283082aa17fff');
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