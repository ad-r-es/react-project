import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Profile.module.scss';

const Profile = props => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [userDataKey, setUserDataKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (props.token && props.userId) {
      const loadUserData = (token, userId) => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-o.firebaseio.com/userData.json' + queryParams)
          .then(response => {
            for (var key in response.data) {
              setDisplayName(response.data[key].displayName);
              setBio(response.data[key].bio);
              setUserDataKey(key)
            }
          })
          .catch(error => {
            // console.log(error);
          })
      };
      loadUserData(props.token, props.userId);
    }
  }, [props.token, props.userId])

  const nameChangedHandler = event => {
    setDisplayName(event.target.value);
  };

  const bioChangedHandler = event => {
    setBio(event.target.value);
  };

  const profileUpdatedHandler = event => {
    setIsEditing(false);
    axios.put(`https://react-o.firebaseio.com/userData/${userDataKey}.json`, {
      displayName: displayName,
      bio: bio,
      userId: props.userId
    }).then(response => {
      // console.log(response);
    }).catch(error => {
      // console.log(error);
    })
  };

  let info = (
    <div className={styles.Info}>
      <p><strong>Display name:</strong> {displayName}</p>
      <p><strong>Bio:</strong> {bio}</p>
      <button
        className={styles.ProfileBtn}
        onClick={() => setIsEditing(true)}
      >
        Edit profile
      </button>
    </div>
  );

  if (isEditing) {
    info = (
      <div className={styles.Info} style={{textAlign: 'center'}}>
        <form>
          <label htmlFor="name"><strong>Display name</strong></label>
          <input
            id="name"
            onChange={nameChangedHandler}
            value={displayName}
          />
          <label htmlFor="bio"><strong>Bio</strong></label>
          <input
            id="bio"
            onChange={bioChangedHandler}
            value={bio}
          />
          <br />
          <Link
            to="/profile"
            onClick={profileUpdatedHandler}
            className={styles.ProfileBtn}
          >
            Done
            <input style={{display: 'none'}} type="submit" />
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

const mapStateToProps = state => {
  return {
    token: state.token,
    userId: state.userId
  };
};

export default connect(mapStateToProps, null)(Profile);
