import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import About from './components/About';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" exact component={Home} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
