/* eslint-disable react/prop-types */
import styles from './profile.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image, Tag } from 'bloomer';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import PostList from '../../components/postList';
import postData from '../../exampleData/posts.json';
import userData from '../../exampleData/users.json';

class Profile extends Component {
  componentDidMount() {
    const {
      fetchUser,
      match: {
        params: { userId },
      },
    } = this.props;
    fetchUser(userId);
  }

  render() {
    const { posts, su, user } = this.props;
    return (
      <>
        <div className={styles.profile}>
          <Image
            isSize="64x64"
            src={su.picture.medium}
            className={styles.avatar}
          />
          <h1 className={styles.heading}>{su.login.username}</h1>
          <p className={styles.subTitle}>
            {' '}
            {su.location.city}
            {', '}
            {su.location.state}
          </p>
          <p className={styles.events}>
            Watched Events:
            <br />
            {user.events.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Tag>{`#${event.name}`}</Tag>
              </Link>
            ))}
          </p>
          <h2 className={styles.title}>
            {su.login.username}
            &apos;s Posts
          </h2>
        </div>
        <PostList posts={posts} />
      </>
    );
  }
}

Profile.propTypes = {
  fetchUser: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    avatar: PropTypes.string,
    city: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    state: PropTypes.string,
    username: PropTypes.string,
  }),
};

Profile.defaultProps = {
  fetchUser: () => {},
  posts: postData.filter((post) => post.user.username === 'eMediaLab'),
  user: { ...userData[2], username: 'eMediaLab' },
};

export default withRouter(Profile);
