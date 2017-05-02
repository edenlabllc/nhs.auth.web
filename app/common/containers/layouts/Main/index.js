import React from 'react';
import withStyles from 'withStyles';

import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.main}>
    <main>
      {children}
    </main>
    <footer className={styles.footer}>
      ©2017 All Rights Recerved
    </footer>
  </div>
);
export default withStyles(styles)(App);
