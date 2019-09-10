import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Profile.module.scss';
import * as actions from '../store/actions/profile';

const Profile = (props) => {
  const [localDisplayName, setLocalDisplayName] = useState('');
  const [localBio, setLocalBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const {
    token,
    userId,
    displayName,
    bio,
    userDataKey,
    onLoadProfile,
    onUpdateProfile,
  } = props;

  useEffect(() => {
    if (displayName && bio && !isEditing) {
      setLocalDisplayName(displayName);
      setLocalBio(bio);
    }
  }, [bio, displayName, isEditing]);

  useEffect(() => {
    if (token && userId) {
      onLoadProfile(token, userId);
    }
  }, [token, userId, onLoadProfile]);

  const nameChangedHandler = (event) => {
    setLocalDisplayName(event.target.value);
  };

  const bioChangedHandler = (event) => {
    setLocalBio(event.target.value);
  };

  const profileUpdatedHandler = () => {
    setIsEditing(false);
    onUpdateProfile(localDisplayName, localBio, userId, userDataKey);
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
              value={localDisplayName}
            />
          </label>
          <label htmlFor="bio">
            <strong>
              Bio
            </strong>
            <input
              id="bio"
              onChange={bioChangedHandler}
              value={localBio}
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
  token: state.auth.token,
  userId: state.auth.userId,
  displayName: state.profile.displayName,
  bio: state.profile.bio,
  userDataKey: state.profile.userDataKey,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadProfile: (token, userId) => dispatch(actions.loadProfile(token, userId)),
  onUpdateProfile: (displayName, bio, userId, userDataKey) => dispatch(
    actions.updateProfile(displayName, bio, userId, userDataKey),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
