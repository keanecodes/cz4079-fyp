import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { 
  settings, 
  enable3DToggle
} from "./mapbox";

export default function Map({show3D}) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        ...settings,
        zoom: show3D ? 12 : 10.5 ,
        bearing: show3D ? -10 : 0,
        pitch: show3D ? 60 : 0,
      });
  
      map.on("load", () => {        
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });

    if (map) {
      enable3DToggle(map, show3D);
    }
  }, [map, show3D]);

  return <div id="map" ref={el => (mapContainer.current = el)}/>;
};
