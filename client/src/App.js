import React, { useState, useEffect } from 'react';
import { Search, Show } from './views';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={Search} />
        <Route exact path="/show/:imdbID" component={Show} />
      </header>
    </div>
  );
}

export default App;
