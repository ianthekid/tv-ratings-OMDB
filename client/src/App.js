import React, { useState, useEffect } from 'react';
import { Home, Search, Show } from './views';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/show/:imdbID" component={Show} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
