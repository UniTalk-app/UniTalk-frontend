import * as React from 'react';
import {StyleProvider} from './Providers';
import {CssBaseline} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from './pages/HomePage';

// @todo separate to other file
const routes = [
  {
    path: '/',
    Component: HomePage
  }
]

function App() {
  return (
    <StyleProvider>
      <CssBaseline />
      <Router>
        <Switch>
          {
            routes.map(({path, Component}) => (
              <Route path={path}><Component /></Route>
            ))
          }
        </Switch>
      </Router>
    </StyleProvider>
  );
}

export default App;
