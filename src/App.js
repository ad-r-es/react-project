import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import About from './components/About';
import Profile from './components/Profile';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={Home} />
      </Switch>
      <footer>
      </footer>
    </div>
  );
};

export default App;
