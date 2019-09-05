import React from 'react';
import './App.scss';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import About from './components/About';
import Profile from './components/Profile';

const App = () => {
  const navLinks = (
    <nav>
      <NavLink to="/" className="Navlink">Home</NavLink>
      <NavLink to="/about" className="Navlink">About</NavLink>
      <NavLink to="/auth" className="Navlink">Sign In</NavLink>
    </nav>
  );

  return (
    <div className="App">
      <header className="App-header">
        <span>
          {navLinks}
        </span>
      </header>
      <br />
      <br />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={Home} />
      </Switch>
      <footer className="App-footer">
        <p><Link className="App-link" to="/about">About page</Link></p>
        <p>
          <a
            className="App-link"
            href="https://github.com/ad-r-es/react-project"
          >
            GitHub repository
          </a>
        </p>
        <p style={{fontSize: '12px'}}>All ocean facts sourced from <a
          className="App-link"
          href="https://blog.trafalgar.com/2016/06/08/10-unbelievable-facts-ocean/"
        >
          https://blog.trafalgar.com
        </a></p>
      </footer>
    </div>
  );
};

export default App;
