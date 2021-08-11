import styles from './postDetails.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Tag } from 'bloomer';
import { Link } from 'react-router-dom';

function PostDetails({ addVote, currentUserId, loggedIn, post }) {
  // direction being 1 if up vote and -1 if down vote
  const onVoteClick = (direction) => (e) => {
    e.preventDefault();
    addVote({ direction, postId: post.id });
  };

  // has this user voted?
  const isSelected = (votes, direction) => {
    if (!loggedIn) return 'is-disabled';
    const vote = votes.find((v) => v.userId === currentUserId);
    // the current user voted for this post and this direction
    if (vote && vote.direction === direction) return 'is-selected';
    // the current user voted for this post but not this direction
    if (vote) return 'is-disabled';
    // the current user did not vote for this post
    return 'is-active';
  };

  // calculate the votes based on the array of votes
  const totalVotes = (votes) =>
    votes.map((vote) => vote.direction).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.details}>
      <div className={styles.events}>
        {post.events.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <Tag>{`#${event.name}`}</Tag>
          </Link>
        ))}
      </div>
      <div className={styles.meta}>
        <Icon
          className={`fa fa-arrow-up ${isSelected(post.votes, 1)}`}
          onClick={onVoteClick(1)}
        />
        {totalVotes(post.votes)}
        <Icon
          className={`fa fa-arrow-down ${isSelected(post.votes, -1)}`}
          onClick={onVoteClick(-1)}
        />
        {`  ${post.commentCount}`}
        <Icon className="fa fa-comment" />
      </div>
    </div>
  );
}

PostDetails.propTypes = {
  addVote: PropTypes.func,
  currentUserId: PropTypes.string,
  loggedIn: PropTypes.bool,
  post: PropTypes.shape({
    commentCount: PropTypes.number,
    createdAt: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    votes: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        vote: PropTypes.number,
      })
    ),
  }),
};

PostDetails.defaultProps = {
  addVote: () => {},
  currentUserId: 'ed7586f6-6022-487a-b7f0-404fa3c2da13',
  loggedIn: true,
  post: {},
};

export default PostDetails;
