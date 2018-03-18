import React from "react";

import styles from "./styles.css";

export default ({ children }) => (
  <span className={styles.upper}>{children}</span>
);
