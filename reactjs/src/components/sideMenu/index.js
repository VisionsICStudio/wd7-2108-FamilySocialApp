/* eslint-disable react/prop-types */
import styles from './sideMenu.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuLabel, MenuList } from 'bloomer';
import { NavLink } from 'react-router-dom';

import eventData from '../../exampleData/events.json';

export default class SideMenu extends React.Component {
  componentDidMount() {
    const { fetchUser, fetchWatching } = this.props;
    fetchUser();
    fetchWatching();
  }

  render() {
    const { loggedIn, user, watching } = this.props;

    return (
      <Menu className={styles.menu}>
        <MenuLabel>Menu</MenuLabel>
        <MenuList>
          <li>
            <NavLink exact activeClassName="is-active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="is-active" to="/events">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="is-active" to="/users">
              Users
            </NavLink>
          </li>
        </MenuList>
        {loggedIn && (
          <>
            <MenuLabel>Dashboard</MenuLabel>
            <MenuList>
              <li>
                <NavLink
                  exact
                  activeClassName="is-active"
                  to={`/profile/${user.login.uuid}`}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="is-active" to="/posts">
                  Your Posts
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="is-active" to="/settings">
                  Settings
                </NavLink>
              </li>
            </MenuList>
            <MenuLabel>Watched Events</MenuLabel>
            <MenuList>
              {watching.map((event) => (
                <li key={event.id}>
                  <NavLink
                    exact
                    activeClassName="is-active"
                    to={`/events/${event.id}`}
                  >
                    {event.name}
                  </NavLink>
                </li>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    );
  }
}

SideMenu.propTypes = {
  fetchUser: PropTypes.func,
  fetchWatching: PropTypes.func,
  loggedIn: PropTypes.bool,
  watching: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

SideMenu.defaultProps = {
  fetchUser: () => {},
  fetchWatching: () => {},
  loggedIn: false,
  watching: eventData.slice(3, 10),
};
