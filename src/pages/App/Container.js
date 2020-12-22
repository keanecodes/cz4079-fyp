import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from "components/layout/Header.js"
import Footer from "components/layout/Footer.js"
import Content from "components/layout/Content.js"

import "components/layout/layout.css"
import { useMediaQuery } from 'react-responsive'

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})

  return (
    <div className="App">
      { !isMobile && <Header/> }  
      { isMobile ? <Content render='mobile'/> : <Content render='desktop'/> }
      { isMobile ? <Footer render="mobile"/> : <Footer render="desktop"/> }  
    </div>
  );
}

