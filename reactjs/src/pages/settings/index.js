/* eslint-disable react/prop-types */
import '@marcioferlan/react-profile-picture/build/ProfilePicture.css';
import styles from './settings.module.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from '@marcioferlan/react-profile-picture';
import { Button, Control, Field, Image, Input, Label } from 'bloomer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: '',
        city: '',
        state: '',
        username: '',
      },
    };
    this.profilePictureRef = React.createRef();
  }

  componentDidMount() {
    const { su } = this.props;
    this.setState({
      user: {
        avatar: su.picture.medium,
        city: su.location.city,
        state: su.location.state,
        username: su.login.username,
      },
    });
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

  onSubmit = (e) => {
    e.preventDefault();
    const { saveUser } = this.props;
    const { user } = this.state;

    const PP = this.profilePictureRef.current;
    saveUser({
      avatar: PP ? PP.getImageAsDataUrl() : user.avatar,
      city: user.city,
      state: user.state,
      username: user.username,
    });
  };

  render() {
    const { su } = this.props;
    const {
      avatar = su.picture.medium,
      city = su.location.city,
      state = su.location.state,
      username = su.login.username,
      showUpload = false,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <h1 className={styles.heading}>Your Settings</h1>
        <div className={styles.profilePic}>
          <Label className={styles.label}>Avatar</Label>
          {(showUpload || !avatar) && (
            <ProfilePicture
              ref={this.profilePictureRef}
              frameFormat="circle"
              minImageSize={64}
              frameSize={64}
            />
          )}
          {avatar && !showUpload && (
            <>
              <Image src={avatar} className={styles.avatar} />
              <Button
                onClick={() => {
                  this.setState({ showUpload: true });
                }}
                className={styles.button}
              >
                Change Avatar
              </Button>
            </>
          )}
        </div>
        <Field>
          <Label className={styles.label}>Username</Label>
          <Control>
            <Input
              className={styles.input}
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </Control>
        </Field>
        <Field>
          <Label className={styles.label}>City</Label>
          <Control>
            <Input
              className={styles.input}
              name="city"
              value={city}
              onChange={this.handleInputChange}
            />
          </Control>
        </Field>
        <Field>
          <Label className={styles.label}>State</Label>
          <Control>
            <Input
              className={styles.input}
              name="state"
              value={state}
              onChange={this.handleInputChange}
            />
          </Control>
        </Field>
        <Button className={styles.button} type="submit">
          Save Settings
        </Button>
      </form>
    );
  }
}

Settings.propTypes = {
  saveUser: PropTypes.func,
};

Settings.defaultProps = {
  saveUser: () => {},
};

export default Settings;
