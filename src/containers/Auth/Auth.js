import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Auth.module.scss';
import * as actions from '../../store/actions/auth';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const Auth = props => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const classes = useStyles();

  const nameChangedHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordChangedHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(emailValue, passwordValue, isSignup);
  };

  const switchAuthMode = () => {
    setIsSignup(!isSignup);
  }

  let form = (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={emailValue}
        onChange={nameChangedHandler}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={passwordValue}
        onChange={passwordChangedHandler}
      />
      <br />
      <button>
        {
          isSignup
          ? 'Sign Up'
          : 'Sign In'
        }
      </button>
      <br />
    </form>
  );

  if (props.loading) {
    form = (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p style={{color: '#b10'}}>Error: {props.error.message}</p>
    );
  }

  return (
    <div>
      <h1>Authentication</h1>
      <div className={styles.Auth}>
        {errorMessage}
        {form}
        <span>
          <button
            className={styles.Button1}
            onClick={switchAuthMode}
          >
            {
              isSignup
              ? 'Have an account? Sign in.'
              : 'No account yet? Sign up.'
            }
          </button>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
