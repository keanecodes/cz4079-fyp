//App routes
import App from "pages/App/App";

//React to create Routes here instead of in layouts to avoid repeating codes
import React from 'react'
import { Route } from "react-router-dom";

export let routes = [
  {
    path: "/app",
    name: "App",
    component: App,
    layout: "/app"
  }
];

export const getRoutes = layoutPath => {
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return this.getRoutes(prop.views);
    }
    if (prop.layout === layoutPath) {
      return (
        <Route
          exact path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
}