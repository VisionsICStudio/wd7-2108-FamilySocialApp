/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import styles from './users.module.css';

import React from 'react';

import { Image } from 'bloomer';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <>
      <div className={styles.searchBar}>
        <input
          className={styles.searchBarInput}
          name="searchFilter"
          placeholder="filter users"
        />
      </div>
      <div className={styles.users}>
        {users.map((user) => (
          <div className={styles.user} key={user.login.uuid}>
            <Image
              isSize="48x48"
              src={user.picture.medium}
              className={styles.avatar}
            />
            <span className={styles.data}>
              <Link
                to={`/selected/user/${user.login.uuid}`}
                className={styles.username}
              >
                {user.login.username}
              </Link>
              <span className={styles.location}>
                {user.location.city}
                {', '}
                {user.location.state}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Users;
