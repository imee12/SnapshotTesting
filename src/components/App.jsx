import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Example from './Example';
import Example2 from './Example2';


const App = () => (
  <Router>
    <Route
      path="/"
      component={() => (
        <div className="main">
          <Route exact path="/" component={Example} />
          <Route path="/Example2" component={Example2} />
        </div>
      )}
    />
  </Router>
);
export default App;
