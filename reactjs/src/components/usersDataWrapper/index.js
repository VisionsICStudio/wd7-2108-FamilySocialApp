/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import styles from './usersDataWrapper.module.css';

import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// pages
import Event from '../../pages/event';
import Events from '../../pages/events';
import Home from '../../pages/home';
import Join from '../../pages/join';
import Login from '../../pages/login';
import Post from '../../pages/post';
import PostAdmin from '../../pages/postAdmin';
import PostForm from '../../pages/postForm';
import Profile from '../../pages/profile';
import SelectedUser from '../../pages/selectedUser';
import Settings from '../../pages/settings';
import Users from '../../pages/users';
// components
import Footer from '../footer';
import Header from '../header';
import SideMenu from '../sideMenu';

class UsersDataWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      user: {
        cell: '',
        dob: {
          age: '',
          date: '',
        },
        email: '',
        gender: '',
        id: {
          name: '',
          value: '',
        },
        location: {
          city: '',
          coordinates: {
            latitude: '',
            longitude: '',
          },
          country: '',
          name: '',
          number: '',
          postcode: '',
          state: '',
          street: '',
          timezone: {
            description: '',
            offset: '',
          },
        },
        login: {
          md5: '',
          password: '',
          salt: '',
          sha1: '',
          sha256: '',
          username: '',
          uuid: '',
        },
        name: {
          first: '',
          last: '',
          title: '',
        },
        nat: '',
        phone: '',
        picture: {
          large: '',
          medium: '',
          thumbnail: '',
        },
        registered: {
          age: '',
          date: '',
        },
      },
      users: [],
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=35')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user: data.results[3], users: data.results });
      });
  }

  filterUser = () => {
    const { user } = this.state;
    const { users } = this.state;

    users
      .filter((u) => u === u[3])
      .map((su) => {
        user.cell = su.cell;
        user.dob.age = su.dob.age;
        user.dob.date = su.dob.date;
        user.email = su.email;
        user.gender = su.gender;
        user.id.name = su.id.name;
        user.id.value = su.id.value;
        user.location.city = su.location.city;
        user.location.coordinates.latitude = su.location.coordinates.latitude;
        user.location.coordinates.longitude = su.location.coordinates.longitude;
        user.location.country = su.location.country;
        user.location.name = su.location.name;
        user.location.number = su.location.number;
        user.location.postcode = su.location.postcode;
        user.location.state = su.location.state;
        user.location.street = su.location.street;
        user.location.timezone.description = su.location.timezone.description;
        user.location.timezone.offset = su.location.timezone.offset;
        user.login.md5 = su.login.md5;
        user.login.password = su.login.password;
        user.login.salt = su.login.salt;
        user.login.sha1 = su.login.sha1;
        user.login.sha256 = su.login.sha256;
        user.login.username = su.login.username;
        user.login.uuid = su.login.uuid;
        user.name.first = su.name.first;
        user.name.last = su.name.last;
        user.name.title = su.name.title;
        user.nat = su.nat;
        user.phone = su.phone;
        user.picture.large = su.picture.large;
        user.picture.medium = su.picture.medium;
        user.picture.thumbnail = su.picture.thumbnail;
        user.registered.age = su.registered.age;
        user.registered.date = su.registered.date;
        return this.setState({ user });
      });
    return user;
  };

  render() {
    const { loggedIn, user, users } = this.state;
    return (
      <>
        <Router>
          <Header user={user} logged={loggedIn} />
          <SideMenu loggedIn={loggedIn} user={user} />
          <main className={styles.content}>
            <Route exact path="/home" component={Home} />
            <Route exact path="/create-post" component={PostForm} />
            <Route exact path="/settings">
              <Settings su={user} />
            </Route>
            <Route exact path="/">
              <Login user={user} />
            </Route>
            <Route exact path="/join" component={Join} />
            <Route exact path="/posts/edit/:postId" component={PostForm} />
            <Route exact path="/posts/:postId" component={Post} />
            <Route exact path="/posts" component={PostAdmin} />
            <Route exact path="/profile/:userId">
              <Profile su={user} />
            </Route>
            <Route exact path="/selected/user/:uuid">
              <SelectedUser users={users} />
            </Route>
            <Route exact path="/users">
              <Users users={users} />
            </Route>
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/:eventId" component={Event} />
          </main>
          <Footer />
        </Router>
      </>
    );
  }
}

export default UsersDataWrapper;
