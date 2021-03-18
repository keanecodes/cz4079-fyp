import {MapboxLayer} from '@deck.gl/mapbox';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';

export async function renderDeckglLayers(map, data) {

  const heatmap = new MapboxLayer({
    id: 'heat',
    type: HeatmapLayer,
    data: data,
    getPosition: d => [d.longitude, d.latitude],
    // getWeight: d => d.resale_price,
    getWeight: d => d.magnitude,
    radiusPixels: 60,
  });

  const hexagon = new MapboxLayer({
    id: 'hex',
    type: HexagonLayer,
    data: data,
    getPosition: d => [d.longitude, d.latitude],
    // getElevationWeight: d => d.resale_price,
    getElevationWeight: d => d.magnitude,
    elevationScale: 10,
    extruded: true,
    radius: 509,         
    opacity: 0.6,        
    coverage: 0.88,
    lowerPercentile: 50,
    transitions: {
      elevationScale: 1000
    }
});



  if(!map.getLayer('heat')) map.addLayer(heatmap);
  if(!map.getLayer('hex'))map.addLayer(hexagon);
  
}


