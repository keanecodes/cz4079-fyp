import { renderDeckglLayers } from "./deckgl";

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

    data && addScatterTimeline(data, map, filterValue);
  }
}