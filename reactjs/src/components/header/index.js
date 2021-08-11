/* eslint-disable sort-destructure-keys/sort-destructure-keys */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import styles from './header.module.css';

import React from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownMenu,
  DropdownTrigger,
  Icon,
} from 'bloomer';
import { Link, useHistory } from 'react-router-dom';

export default function Header({ logged, user }) {
  const history = useHistory();
  const logout = () => {};
  const onClickLogout = (e) => {
    e.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <header className={styles.background}>
      <a href="/">
        <div className={styles.logo}>
          <span className={styles.logoFont}>FamilySocial</span>
        </div>
      </a>
      <div className={styles.searchBar}>
        <input
          className={styles.searchBarInput}
          name="search"
          placeholder="search by keywords or events..."
        />
      </div>
      {logged === true && (
        <div className={styles.loggedInMenu}>
          <Link to="/create-post" className={styles.navButton}>
            New Post
          </Link>
          <Dropdown isHoverable isAlign="right">
            <DropdownTrigger aria-haspopup="true" aria-controls="dropdown-menu">
              <img
                src={user.picture.medium}
                className={styles.avatar}
                alt={user.name.first}
              />
              <Icon
                icon="angle-down"
                isSize="small"
                className="fa fa-angle-down"
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownContent className={styles.ddContent}>
                <h4 className={styles.ddTitle}>Welcome {user.name.first}</h4>
                <Link
                  to={`/profile/${user.login.uuid}`}
                  className="dropdown-item"
                >
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  onClick={onClickLogout}
                  className="dropdown-item"
                  role="presentation"
                >
                  Logout
                </a>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
      {logged === false && (
        <div className={styles.loggedInMenu}>
          <Link to="/" className={styles.navButton}>
            Login
          </Link>
          <Dropdown isHoverable isAlign="right">
            <DropdownTrigger aria-haspopup="true" aria-controls="dropdown-menu">
              <img
                src="../../images/default_avatar.png"
                className={styles.avatar}
                alt="default avatar"
              />
              <Icon
                icon="angle-down"
                isSize="small"
                className="fa fa-angle-down"
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownContent>
                <h4>Welcome Guest</h4>
                <hr />
                <Link to="/" className="dropdown-item">
                  Login
                </Link>
                <Link to="/about" className="dropdown-item">
                  About
                </Link>
                <Link to="/join" className="dropdown-item">
                  Join
                </Link>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </header>
  );
}
