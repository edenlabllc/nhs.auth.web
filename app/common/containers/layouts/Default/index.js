import React from "react";
import withStyles from "withStyles";

import styles from "./styles.css";

const App = ({ children }) => (
  <div className={styles.main}>
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <img src="/images/logo.svg" alt="Logo" />
      </a>
    </header>
    {children}
  </div>
);
export default withStyles(styles)(App);
