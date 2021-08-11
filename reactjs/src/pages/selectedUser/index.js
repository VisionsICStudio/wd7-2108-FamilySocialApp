/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import styles from './selectedUser.module.css';

import React from 'react';

import { useParams } from 'react-router-dom';

function SelectedUser({ users }) {
  const { uuid } = useParams();
    return (
      <>
        <h1 className={styles.heading}>Selected User</h1>
        {users.filter(user => user.login.uuid === uuid).map(selectedUser => (
          <div className={`container ${styles.cardContainer}`}>
            <div className={`card flex-row flex-wrap ${styles.card}`}>
              <div className="card-header border-0">
                <img src={selectedUser.picture.large} alt={selectedUser.name.first} className={styles.userImg} />
              </div>
              <div className={`card-block px-2 ${styles.cardBlock}`}>
                <h4 className={`card-title ${styles.trial}`}>
                  <strong className={styles.labels}>Name:</strong>
                  {' '}
                  {selectedUser.name.first}
                  {' '}
                  {selectedUser.name.last}
                </h4>
                <p className={`card-text ${styles.trial}`}>
                  <strong className={styles.labels}>Username:</strong>
                  {' '}
                  {selectedUser.login.username}
                </p>
                <p className={`card-text ${styles.trial}`}>
                  <strong className={styles.labels}>Address:</strong>
                  {' '}
                  {selectedUser.location.street.number}
                  {' '}
                  {selectedUser.location.street.name}
                </p>
                <p className={`card-text ${styles.trial}`}>
                  {' '}
                  {selectedUser.location.city}
                  ,
                  {' '}
                  {selectedUser.location.state}
                  {' '}
                  {selectedUser.location.postcode}
                </p>
                <p className={`card-text ${styles.trial}`}>
                  <strong className={styles.labels}>Email Address:</strong>
                  {' '}
                  {selectedUser.email}
                </p>
                <p className={`card-text ${styles.trial}`}>
                  <strong className={styles.labels}>Phone Number:</strong>
                  {' '}
                  {selectedUser.phone}
                </p>
                <p className={`card-text ${styles.trial}`}>
                  <strong className={styles.labels}>Mobile Number:</strong>
                  {' '}
                  {selectedUser.cell}
                </p>
                <br />
                <a href="/users" className={styles.navButton}>Back To Users</a>
              </div>
              <div className="w-100" />
              <div className={`card-footer w-100 text-muted ${styles.trial}`}>
                <strong className={styles.labels}>{selectedUser.login.username}</strong>
                {'    '}
                has been a member since 
                {'    '}
                <strong className={styles.labels}>{selectedUser.registered.date.substring(0, 10)}</strong>
              </div>
            </div>
          </div>
        ))}
      </>
    )
}

export default SelectedUser;
