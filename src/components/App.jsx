import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Example from './Example';

const App = () => (
  <Router>
    <Route
      path="/"
      component={() => (
        <div className="main">
          <Route exact path="/" component={Example} />
        </div>
      )}
    />
  </Router>
);
export default App;
