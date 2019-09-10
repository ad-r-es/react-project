import React, { useEffect } from 'react';
import './App.scss';
import {
  Switch, Route, Link, NavLink, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import About from './components/About';
import Profile from './components/Profile';
import * as actions from './store/actions/auth';

const App = (props) => {
  const { token, onTryReSignIn } = props;

  useEffect(() => {
    onTryReSignIn();
  }, [onTryReSignIn]);

  let navLinks = (
    <nav>
      <NavLink to="/" className="Navlink">Home</NavLink>
      <NavLink to="/about" className="Navlink">About</NavLink>
      <NavLink to="/auth" className="Navlink">Sign In</NavLink>
    </nav>
  );

  if (token) {
    navLinks = (
      <nav>
        <NavLink to="/" className="Navlink">Home</NavLink>
        <NavLink to="/about" className="Navlink">About</NavLink>
        <NavLink to="/profile" className="Navlink">Profile</NavLink>
        <NavLink to="/" className="Navlink-danger" onClick={() => props.onLogout()}>Sign Out</NavLink>
      </nav>
    );
  }

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/about" component={About} />
      <Route path="/" exact component={Home} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (new Date(localStorage.expirationDate) >= new Date()) {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <span>
          {navLinks}
        </span>
      </header>
      <br />
      <br />
      {routes}
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
        <p style={{ fontSize: '12px' }}>
All ocean facts sourced from
          <a
            className="App-link"
            href="https://blog.trafalgar.com/2016/06/08/10-unbelievable-facts-ocean/"
          >
          https://blog.trafalgar.com
          </a>
        </p>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
  onTryReSignIn: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
