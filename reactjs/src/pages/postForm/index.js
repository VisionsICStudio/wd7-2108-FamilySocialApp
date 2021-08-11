import 'easymde/dist/easymde.min.css';
import styles from './postForm.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'bloomer/lib/elements/Form/Input';
import SimpleMDE from 'react-simplemde-editor';
import ReactEvents from 'react-tag-autocomplete';

import eventData from '../../exampleData/events.json';
import postData from '../../exampleData/posts.json';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    const {
      fetchPost,
      match: {
        params: { postId },
      },
    } = this.props;
    if (postId) {
      fetchPost(postId);
    }
    this.state = {};
  }

  handleMarkdownChange = (value) => {
    this.setState({
      content: value,
    });
  };

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

  handleDelete = (i) => {
    const { events } = this.state;
    const newEvents = [...events];
    newEvents.splice(i, 1);
    this.setState({ events: newEvents });
  };

  handleAddition = (event) => {
    const {
      post: { events: defaultEvents = [] },
    } = this.props;
    const { events = defaultEvents } = this.state;
    const newEvents = [...events, event];
    this.setState({ events: newEvents });
  };

  onSubmit = () => {
    const { content, events, title } = this.state;
    const {
      history,
      post: { id },
      savePost,
    } = this.props;
    savePost({ content, events, id, title });
    history.push('/posts');
  };

  render() {
    const {
      post: {
        title: defaultTitle = '',
        content: defaultContent = '',
        events: defaultEvents = [],
      },
      match: {
        params: { postId },
      },
      suggestions,
    } = this.props;
    const {
      content = defaultContent,
      events = defaultEvents,
      title = defaultTitle,
    } = this.state;
    return (
      <div className={styles.createPost}>
        <h1 className={styles.heading}>
          {postId ? 'Edit Post' : 'Create a New Post'}
        </h1>
        <Input
          className={styles.input}
          name="title"
          value={title}
          onChange={this.handleInputChange}
          placeholder="Title"
        />
        <SimpleMDE
          value={content}
          onChange={this.handleMarkdownChange}
          options={{
            autofocus: true,
            previewClass: [styles.preview, 'editor-preview'],
            spellChecker: true,
          }}
        />
        <ReactEvents
          events={events}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          allowNew
          classNames={{
            root: styles.events,
            rootFocused: styles.isFocused,
            search: styles.eventsSearch,
            searchInput: styles.eventsSearchInput,
            selected: styles.eventsSelected,
            selectedEvent: styles.eventsSelectedEvent,
            selectedEventName: styles.eventsSelectedEventName,
            suggestionActive: styles.isActive,
            suggestionDisabled: styles.isDisabled,
            suggestions: styles.eventsSuggestions,
          }}
        />
        <button type="button" onClick={this.onSubmit} className={styles.button}>
          Save Post
        </button>
      </div>
    );
  }
}

CreatePost.propTypes = {
  fetchPost: PropTypes.func,
  post: PropTypes.shape({
    content: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  savePost: PropTypes.func,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

CreatePost.defaultProps = {
  fetchPost: () => {},
  post: postData[0],
  savePost: () => {},
  suggestions: eventData,
};

export default CreatePost;
