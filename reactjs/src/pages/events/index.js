import styles from './events.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'bloomer';
import moment from 'moment';
import { Link } from 'react-router-dom';

import eventData from '../../exampleData/events.json';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
    };
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const {
      target: { name, value },
    } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { events } = this.props;
    const { searchFilter } = this.state;

    const filteredEvents = events.filter((event) => {
      if (!searchFilter) return true;
      const search = searchFilter.toLowerCase();
      return event.name.toLowerCase().indexOf(search) !== -1;
    });

    return (
      <>
        <div className={styles.searchBar}>
          <input
            className={styles.searchBarInput}
            name="searchFilter"
            onChange={this.handleInputChange}
            placeholder="filter events"
          />
        </div>
        <div className={styles.events}>
          {filteredEvents.map((event) => (
            <div className={styles.event} key={event.id}>
              <Icon isSize="large" className={`fa ${event.icon}`} />
              <span className={styles.data}>
                <Link to={`/events/${event.id}`} className={styles.eventTitle}>
                  {event.name}
                </Link>
                <span className={styles.meta}>{`${event.count} Posts`}</span>
                <span className={styles.meta}>
                  {`Last post was ${moment(event.lastPostAt).fromNow()}`}
                </span>
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }
}
Users.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      icon: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  events: eventData,
};
export default Users;
