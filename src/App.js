import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import Home from './containers/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path="/" exact component={Home} />
      </header>
    </div>
  );
}

export default App;
