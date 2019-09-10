import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Profile.module.scss';
import * as actions from '../store/actions/profile';

const Profile = (props) => {
  const [, setDisplayName] = useState('');
  const [, setBio] = useState('');
  const [, setUserDataKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { token, userId, displayName, bio, userDataKey, onLoadProfile } = props;

  useEffect(() => {
    if (token && userId) {
      console.log(token, userId)
      onLoadProfile(token, userId)
    }
  }, [token, userId]);

  const nameChangedHandler = (event) => {
    setDisplayName(event.target.value);
  };

  const bioChangedHandler = (event) => {
    setBio(event.target.value);
  };

  const profileUpdatedHandler = () => {
    setIsEditing(false);
    axios.put(`https://react-o.firebaseio.com/userData/${userDataKey}.json`, {
      displayName,
      bio,
      userId: props.userId,
    });
  };

  let info = (
    <div className={styles.Info}>
      <p>
        <strong>Display name:</strong>
        {' '}
        {displayName}
      </p>
      <p>
        <strong>Bio:</strong>
        {' '}
        {bio}
      </p>
      <button
        type="button"
        className={styles.ProfileBtn}
        onClick={() => setIsEditing(true)}
      >
        Edit profile
      </button>
    </div>
  );

  if (isEditing) {
    info = (
      <div className={styles.Info} style={{ textAlign: 'center' }}>
        <form>
          <label htmlFor="name">
            <strong>
              Display name
            </strong>
            <input
              id="name"
              onChange={nameChangedHandler}
              value={displayName}
            />
          </label>
          <label htmlFor="bio">
            <strong>
              Bio
            </strong>
            <input
              id="bio"
              onChange={bioChangedHandler}
              value={bio}
            />
          </label>
          <br />
          <Link
            to="/profile"
            onClick={profileUpdatedHandler}
            className={styles.ProfileBtn}
          >
            Done
            <input style={{ display: 'none' }} type="submit" />
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      {info}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  userId: state.userId,
  displayName: state.displayName,
  bio: state.bio,
  userDataKey: state.userDataKey,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadProfile: (token, userId) => dispatch(actions.loadProfile(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
