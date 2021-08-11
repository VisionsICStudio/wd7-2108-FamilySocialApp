/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable simple-import-sort/sort */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-state */
import 'bulma/css/bulma.css';
import styles from './app.module.css';

import React from 'react';

import UsersDataWrapper from './components/usersDataWrapper';

function App() {
  return (
    <section className={styles.backgroundBody}>
      <section className={styles.container}>
        <UsersDataWrapper />
      </section>
    </section>
  );
}

export default App;
