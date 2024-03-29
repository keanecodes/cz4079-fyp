// Framework
import React from 'react';

//Routing
import { render } from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { RecoilRoot } from 'recoil'

import InitApp from 'pages/InitApp'
import './index.css';

const hist = createBrowserHistory();
      
render(
  // <React.StrictMode>
    <RecoilRoot>
      <Router history={hist}>
        <Switch>
          <Route
            path="/"
            render={props => {
              return <InitApp {...props}/>;
            }}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </RecoilRoot> 
  // </React.StrictMode>,
  ,document.getElementById('root')
);


