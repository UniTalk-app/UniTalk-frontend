import * as React from 'react';
import {StyleProvider} from './Providers';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from 'pages/HomePage';
import MainLayout from 'pages/MainLayout';

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
      <MainLayout>
      <Router>
        <Switch>
          {
            routes.map(({path, Component}) => (
              <Route path={path}><Component /></Route>
            ))
          }
        </Switch>
      </Router>
      </MainLayout>
    </StyleProvider>
  );
}

export default App;
