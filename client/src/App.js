import React, { useState, useEffect } from 'react';
import Show from './views/Show';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Show />
      </header>
    </div>
  );
}

export default App;
