// Framework
import React from 'react';

//Routing
import { render } from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// Design 
import './index.css';
import App from "./pages/App"
import BackDrop from 'components/BackDrop'

// Data & State Management
import { RecoilRoot } from 'recoil'
import resales from 'data/resale1990_2020onwards.csv'
const hist = createBrowserHistory();

//Loading Before Mount
hist.push('/')
render(<BackDrop open={true}/>, document.getElementById('root'));

//Try to load ~80k data points
try {
  const DATA_URL = resales
  require('d3-request').csv(DATA_URL, (error, response) => {
    if (!error) {
      const data = response.map(row => ({
        timestamp: new Date(`${row.month}`).getTime(),
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        resale_price: Number(row.resale_price),
        floor_area_sqm: Number(row.floor_area_sqm)
      }));

      if (data) {
        //Mount with Data Only
        render(
          // <React.StrictMode>
            <RecoilRoot>
              <Router history={hist}>
                <Switch>
                  <Route
                    path="/"
                    render={props => {
                      return <App data={data} {...props}/>;
                    }}
                  />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
              </Router>
            </RecoilRoot> 
          // </React.StrictMode>,
          ,document.getElementById('root')
        );
      }
    }
  })
  
} catch (e) {
  console.error(e)
}

