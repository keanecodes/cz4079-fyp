import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGLMap from 'components/map/Map'
import FilterPills from 'components/controls/mobile/FilterPills'
import FilterBar from 'components/controls/desktop/FilterBar';
import Timeline from 'components/controls/desktop/Timeline'
import TabBar from 'components/controls/mobile/TabBar';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';

export default function App() {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})

  const [state, setState] = useState({
    show3D: false,
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.App}>
      { !isMobile && <div className="section header"> <FilterBar show3D={state.show3D} handleChange={handleChange} /> </div>}
      <main className="content">
        <MapboxGLMap show3D={state.show3D}/>
        {isMobile && <FilterPills/>}
      </main>
      <footer className="footer" >{ isMobile ? <TabBar/> : <Timeline/> }</footer>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    '& .section': { fontSize: '1rem' },
    '& .header, & .footer': {
      flex: '1',
      height: '100%',
      width: '100%',
      background: 'var(--dark-background)',
    },
    '& .footer': { zIndex: 1, },
    '& .content': { flex: 20, },
  }
}));
