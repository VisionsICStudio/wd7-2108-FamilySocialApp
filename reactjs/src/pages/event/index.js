import styles from './event.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'bloomer';

import PostList from '../../components/postList';
import eventData from '../../exampleData/events.json';
import examplePosts from '../../exampleData/posts.json';
import userData from '../../exampleData/users.json';

class Event extends Component {
  componentDidMount() {
    const {
      fetchPosts,
      match: {
        params: { eventId },
      },
    } = this.props;
    fetchPosts({ event: eventId });
  }

  onWatchClick = () => {
    const {
      addToWatched,
      match: {
        params: { eventId },
      },
    } = this.props;
    addToWatched(eventId);
  };

  onStopWatchClick = () => {
    const {
      match: {
        params: { eventId },
      },
      removeFromWatched,
    } = this.props;
    removeFromWatched(eventId);
  };

  render() {
    const { event, posts, user } = this.props;
    const alreadyWatching = user.events.find((e) => e.id === event.id);
    return (
      <>
        <h1 className={styles.heading}>
          {event.name}
          {!alreadyWatching && (
            <Button className={styles.button} onClick={this.onWatchClick}>
              Watch Event
            </Button>
          )}
          {alreadyWatching && (
            <Button
              className={styles.stopButton}
              onClick={this.onStopWatchClick}
            >
              Stop Watching
            </Button>
          )}
        </h1>

        <PostList posts={posts} />
      </>
    );
  }
}

Event.propTypes = {
  addToWatched: PropTypes.func,
  event: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  fetchPosts: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  removeFromWatched: PropTypes.func,
  user: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.object),
  }),
};

Event.defaultProps = {
  addToWatched: () => {},
  event: eventData[3],
  fetchPosts: () => {},
  posts: examplePosts.filter(
    (post) => post.events.filter((event) => event.id === eventData[3].id).length
  ),
  removeFromWatched: () => {},
  user: userData[3],
};

export default Event;
