import React from "react";

import styles from "./styles.css";

const App = ({ children, t }) => (
  <div className={styles.main}>
    <main>{children}</main>
    <footer className={styles.footer}>
      ©{new Date().getFullYear()} Всі права захищені
    </footer>
  </div>
);
export default App;
