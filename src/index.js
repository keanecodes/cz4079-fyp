// Framework
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { RecoilRoot } from 'recoil'

// Design 
import './index.css';
import App from "./pages/App"

// Data & State Management
const hist = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
    // <RecoilRoot>
      <Router history={hist}>
        <Switch>
          <Route
            path="/"
            render={props => {
              return <App {...props}/>;
            }}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    // </RecoilRoot> 
  // </React.StrictMode>,
  // <App />
  ,document.getElementById('root')
);
