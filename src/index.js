// Framework
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import reportWebVitals from './reportWebVitals';
import resale1k from "data/resale1990_2020onwards.csv"

// Design 
import './index.css';
import App from "./pages/App/Container"

// Data & State Management
const hist = createBrowserHistory();

require('d3-request').csv(resale1k, (error, response) => {
  // require('d3-request').csv('https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/earthquakes/data.csv', (error, response) => {
  if (!error) {
    const data = response.map(row => ({
      timestamp: new Date(`${row.month}`).getTime(),
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      depth: Number(row.floor_area_sqm),
      magnitude: Number(row.resale_price)

      // timestamp: new Date(`${row.DateTime}`).getTime(),
      // latitude: Number(row.Latitude),
      // longitude: Number(row.Longitude),
      // depth: Number(row.Depth),
      // magnitude: Number(row.Magnitude)
    }));

    ReactDOM.render(
      <React.StrictMode>
        {/* <RecoilRoot> */}
          <Router history={hist}>
            <Switch>
              <Route
                path="/"
                render={props => {
                  return <App {...props} data={data} />;
                }}
              />
            </Switch>
          </Router>
        {/* </RecoilRoot> */}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



