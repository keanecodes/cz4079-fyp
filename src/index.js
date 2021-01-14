// Framework
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import reportWebVitals from './reportWebVitals';

// Design 
import './index.css';
import App from "./pages/App/Container"

// Data & State Management
const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    {/* <RecoilRoot> */}
      <Router history={hist}>
        <Switch>
          <Route
            path="/"
            render={props => {
              return <App {...props} />;
            }}
          />
        </Switch>
      </Router>
    {/* </RecoilRoot> */}
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



